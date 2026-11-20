import express from 'express';
import request from 'supertest';
import moment from 'moment';
import { Fetcher, countCommitsByDay } from '../src/fetcher';
import { Utilities } from '../src/utils';
import { Handlers } from '../src/handlers';
import { RepositoryNode, UserDetails } from '../src/interfaces/interface';

const repo = (
    name: string,
    branches: Array<Array<{ oid: string; committedDate: string }>>,
): RepositoryNode => ({
    nameWithOwner: name,
    pushedAt: null,
    refs: {
        nodes: branches.map((nodes) => ({
            target: { history: { nodes, pageInfo: { hasNextPage: false } } },
        })),
    },
});

describe('countCommitsByDay', () => {
    it('counts commits from non-default branches', () => {
        const counts = countCommitsByDay([
            repo('u/r', [
                [{ oid: 'a', committedDate: '2026-08-07T10:00:00Z' }],
                [{ oid: 'b', committedDate: '2026-08-07T12:00:00Z' }],
            ]),
        ]);
        expect(counts.get('2026-08-07')).toBe(2);
    });

    it('does not count the same SHA twice within a repository', () => {
        const shared = { oid: 'same', committedDate: '2026-08-07T10:00:00Z' };
        const counts = countCommitsByDay([
            repo('u/r', [[shared, { oid: 'x', committedDate: '2026-08-06T10:00:00Z' }], [shared]]),
        ]);
        expect(counts.get('2026-08-07')).toBe(1);
        expect(counts.get('2026-08-06')).toBe(1);
    });

    it('counts across different repositories separately', () => {
        const c = { oid: 'same', committedDate: '2026-08-07T10:00:00Z' };
        const counts = countCommitsByDay([repo('u/a', [[c]]), repo('u/b', [[c]])]);
        expect(counts.get('2026-08-07')).toBe(2);
    });

    it('tolerates repos with no refs or empty targets', () => {
        const counts = countCommitsByDay([
            { nameWithOwner: 'u/empty', pushedAt: null, refs: null },
            { nameWithOwner: 'u/none', pushedAt: null, refs: { nodes: [{ target: null }] } },
        ]);
        expect(counts.size).toBe(0);
    });
});

describe('Fetcher.fetchCommits', () => {
    const today = moment.utc();
    const iso = (daysAgo: number) =>
        moment.utc(today).subtract(daysAgo, 'days').hour(12).toISOString();

    const mockFetch = (fetcher: Fetcher, responses: unknown[]) => {
        const fn = jest.fn();
        responses.forEach((r) => fn.mockResolvedValueOnce({ data: r }));
        // @ts-ignore: mocking private method
        fetcher.fetch = fn;
        return fn;
    };

    it('builds a daily series and keeps `days` entries', async () => {
        const fetcher = new Fetcher('octocat', 'token');
        const fn = mockFetch(fetcher, [
            { data: { user: { id: 'U_1', name: 'The Octocat' } } },
            {
                data: {
                    user: {
                        repositories: {
                            nodes: [
                                repo('octocat/r', [
                                    [{ oid: '1', committedDate: iso(1) }],
                                    [
                                        { oid: '1', committedDate: iso(1) },
                                        { oid: '2', committedDate: iso(2) },
                                    ],
                                ]),
                            ],
                        },
                    },
                },
            },
        ]);

        const result = (await fetcher.fetchCommits(7)) as UserDetails;
        expect(result.name).toBe('The Octocat');
        expect(result.contributions.length).toBe(7);
        const counts = result.contributions.map((d) => d.contributionCount);
        // yesterday has one (deduplicated) commit, two days ago has one, the rest are empty
        expect(counts.reduce((a, b) => a + b, 0)).toBe(2);
        expect(fn).toHaveBeenCalledTimes(2); // 1 for the user id + 1 for all commits
        // author filter uses the id from the first request
        expect(fn.mock.calls[1][0].variables.AUTHOR).toBe('U_1');
    });

    it('supports a custom date range', async () => {
        const fetcher = new Fetcher('octocat', 'token');
        mockFetch(fetcher, [
            { data: { user: { id: 'U_1', name: null } } },
            {
                data: {
                    user: {
                        repositories: {
                            nodes: [
                                repo('octocat/r', [
                                    [{ oid: '1', committedDate: '2026-08-07T10:00:00Z' }],
                                ]),
                            ],
                        },
                    },
                },
            },
        ]);
        const result = (await fetcher.fetchCommits(
            4,
            '2026-08-05T00:00:00.000Z',
            '2026-08-08T00:00:00.000Z',
        )) as UserDetails;
        expect(result.contributions.map((d) => d.date)).toEqual(['5', '6', '7', '8']);
        expect(result.contributions.map((d) => d.contributionCount)).toEqual([0, 0, 1, 0]);
    });

    it('returns an error message for an unknown user', async () => {
        const fetcher = new Fetcher('nobody', 'token');
        mockFetch(fetcher, [{ data: { user: null } }]);
        expect(await fetcher.fetchCommits(31)).toMatch(/Can't fetch any commits/);
    });

    it('reports rate limiting', async () => {
        const fetcher = new Fetcher('octocat', 'token');
        mockFetch(fetcher, [{ errors: [{ type: 'RATE_LIMITED', message: 'x' }] }]);
        expect(await fetcher.fetchCommits(31)).toMatch(/rate limit/);
    });

    it('fetchActivity dispatches on the metric', async () => {
        const fetcher = new Fetcher('octocat', 'token');
        const commits = jest.spyOn(fetcher, 'fetchCommits').mockResolvedValue('commits');
        const contribs = jest.spyOn(fetcher, 'fetchContributions').mockResolvedValue('contribs');
        expect(await fetcher.fetchActivity('commits', 31)).toBe('commits');
        expect(await fetcher.fetchActivity('contributions', 31)).toBe('contribs');
        expect(commits).toHaveBeenCalledTimes(1);
        expect(contribs).toHaveBeenCalledTimes(1);
    });
});

describe('metric query option', () => {
    it('defaults to contributions', () => {
        expect(new Utilities({ username: 'a' }).queryOptions().metric).toBe('contributions');
    });
    it('accepts metric=commits (case-insensitive)', () => {
        expect(new Utilities({ username: 'a', metric: 'commits' }).queryOptions().metric).toBe(
            'commits',
        );
        expect(new Utilities({ username: 'a', metric: 'COMMITS' }).queryOptions().metric).toBe(
            'commits',
        );
    });
    it('falls back to contributions for unknown values', () => {
        expect(new Utilities({ username: 'a', metric: 'nope' }).queryOptions().metric).toBe(
            'contributions',
        );
    });
});

describe('GET /graph?metric=commits', () => {
    afterEach(() => jest.restoreAllMocks());

    const readBody = (res: any, callback: (err: Error | null, body: string) => void) => {
        let body = '';
        res.on('data', (chunk: Buffer) => (body += chunk));
        res.on('end', () => callback(null, body));
    };

    it('renders a commit graph and uses the commits fetcher', (done) => {
        const spy = jest.spyOn(Fetcher.prototype, 'fetchCommits').mockResolvedValue({
            name: 'Ashutosh Dwivedi',
            contributions: [1, 0, 3].map((c, i) => ({ contributionCount: c, date: String(i + 1) })),
        });
        const contribSpy = jest.spyOn(Fetcher.prototype, 'fetchContributions');
        const app = express();
        app.get('/graph', new Handlers().getGraph);
        request(app)
            .get('/graph?username=ashutosh00710&metric=commits&theme=dracula')
            .buffer(true)
            .parse(readBody)
            .expect('Cache-Control', 'public, max-age=3600')
            .expect((res) => {
                expect(res.body).toContain("Ashutosh Dwivedi's Commit Graph");
                expect(res.body).toContain('Commits');
                expect(spy).toHaveBeenCalledTimes(1);
                expect(contribSpy).not.toHaveBeenCalled();
            })
            .end(done);
    });
});
