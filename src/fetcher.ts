import moment from 'moment';
import {
    Query,
    UserDetails,
    Week,
    ContributionDay,
    ResponseOfApi,
    CommitsResponse,
    UserIdResponse,
    RepositoryNode,
    Metric,
} from 'src/interfaces/interface';

// Limits for the commit metric. They keep a single request well under GitHub's
// GraphQL node limit (500k) and bound the cost of a public instance.
export const MAX_REPOS = 30;
export const MAX_BRANCHES_PER_REPO = 30;
export const MAX_COMMITS_PER_BRANCH = 100;

const DATE_KEY = 'YYYY-MM-DD';

/**
 * Counts commits per UTC day. A commit that is reachable from several branches
 * of the same repository is counted once (deduplicated by SHA per repository).
 * Returns a map of `YYYY-MM-DD` -> number of commits.
 */
export function countCommitsByDay(repos: RepositoryNode[]): Map<string, number> {
    const counts = new Map<string, number>();
    for (const repo of repos) {
        const seen = new Set<string>();
        for (const branch of repo.refs?.nodes ?? []) {
            for (const commit of branch.target?.history?.nodes ?? []) {
                if (seen.has(commit.oid)) continue;
                seen.add(commit.oid);
                const day = moment.utc(commit.committedDate).format(DATE_KEY);
                counts.set(day, (counts.get(day) ?? 0) + 1);
            }
        }
    }
    return counts;
}

export class Fetcher {
    private readonly username: string;
    private readonly token: string | undefined;
    // token defaults to process.env.TOKEN (Node); the Cloudflare Worker passes its TOKEN secret
    constructor(username: string, token?: string) {
        this.username = username;
        this.token = token ?? process.env.TOKEN;
    }

    private getGraphQLQuery(from: string, to: string) {
        return {
            query: `
              query userInfo($LOGIN: String!, $FROM: DateTime!, $TO: DateTime!) {
                user(login: $LOGIN) {
                  name
                  contributionsCollection(from: $FROM, to: $TO) {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
                LOGIN: this.username,
                FROM: from,
                TO: to,
            },
        };
    }

    // Uses the built-in fetch (Node 18+ and Cloudflare Workers) instead of axios
    private async fetch<T = ResponseOfApi>(graphQLQuery: Query): Promise<{ data: T }> {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `bearer ${this.token}`,
                'Content-Type': 'application/json',
                // GitHub rejects API requests without a User-Agent (fetch doesn't set one in Workers)
                'User-Agent': 'github-readme-activity-graph',
            },
            body: JSON.stringify(graphQLQuery),
        });
        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }
        return { data: (await response.json()) as T };
    }

    /** Picks the data source for the requested metric (default: GitHub contributions). */
    public fetchActivity(
        metric: Metric,
        days: number,
        customFromDate?: string,
        customToDate?: string,
    ): Promise<UserDetails | string> {
        return metric === 'commits'
            ? this.fetchCommits(days, customFromDate, customToDate)
            : this.fetchContributions(days, customFromDate, customToDate);
    }

    public async fetchContributions(
        days: number,
        customFromDate?: string,
        customToDate?: string,
    ): Promise<UserDetails | string> {
        let from = '',
            to = '';
        if (customFromDate && customToDate) {
            from = moment(customFromDate).utc().toISOString(true);
            to = moment(customToDate).utc().toISOString(true);
        } else {
            const now = moment();
            from = moment(now).subtract(days, 'days').utc().toISOString();
            // also include the next day in case our server is behind in time with respect to GitHub
            to = moment(now).add(1, 'days').utc().toISOString();
        }

        try {
            const apiResponse = await this.fetch(this.getGraphQLQuery(from, to));

            if (apiResponse.data.errors) {
                console.error('API Error: ', apiResponse.data.errors);
                if (apiResponse.data.errors[0].type === 'RATE_LIMITED') {
                    console.log('GraphQL Error: API rate limit exceeded');
                    return '💥 API rate limit exceeded. Please deploy your own instance.';
                } else {
                    return `Can't fetch any contribution. Please check your username 😬`;
                }
            } else if (apiResponse.data.data) {
                if (apiResponse.data.data.user === null)
                    return `Can't fetch any contribution. Please check your username 😬`;
                else {
                    const userData: UserDetails = {
                        contributions: [],
                        name: apiResponse.data.data.user.name,
                    };
                    //filtering the week data from API response
                    const weeks =
                        apiResponse.data.data.user.contributionsCollection.contributionCalendar
                            .weeks;
                    // get day-contribution data
                    weeks.map((week: Week) =>
                        week.contributionDays.map((contributionDay: ContributionDay) => {
                            contributionDay.date = moment(contributionDay.date, moment.ISO_8601)
                                .date()
                                .toString();
                            userData.contributions.push(contributionDay);
                        }),
                    );

                    // if 32nd entry is 0 means:
                    // either the day hasn't really started
                    // or the user hasn't contributed today
                    const length = userData.contributions.length;
                    if (!(customFromDate && customToDate)) {
                        if (userData.contributions[length - 1].contributionCount === 0) {
                            userData.contributions.pop();
                        }
                        const extra = userData.contributions.length - days;
                        userData.contributions.splice(0, extra);
                    }
                    return userData;
                }
            } else {
                console.error('Unexpected API response structure');
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.log('error: ', error);
            return `Can't fetch any contribution. Please check your username 😬`;
        }
    }

    private getUserIdQuery(): Query {
        return {
            query: `
              query userId($LOGIN: String!) {
                user(login: $LOGIN) {
                  id
                  name
                }
              }
            `,
            variables: { LOGIN: this.username },
        };
    }

    private getCommitsQuery(authorId: string, since: string, until: string): Query {
        return {
            query: `
              query userCommits(
                $LOGIN: String!
                $AUTHOR: ID!
                $SINCE: GitTimestamp!
                $UNTIL: GitTimestamp!
                $REPOS: Int!
                $BRANCHES: Int!
                $COMMITS: Int!
              ) {
                user(login: $LOGIN) {
                  repositories(
                    first: $REPOS
                    ownerAffiliations: [OWNER]
                    privacy: PUBLIC
                    orderBy: { field: PUSHED_AT, direction: DESC }
                  ) {
                    nodes {
                      nameWithOwner
                      pushedAt
                      refs(refPrefix: "refs/heads/", first: $BRANCHES) {
                        nodes {
                          target {
                            ... on Commit {
                              history(
                                since: $SINCE
                                until: $UNTIL
                                author: { id: $AUTHOR }
                                first: $COMMITS
                              ) {
                                nodes {
                                  oid
                                  committedDate
                                }
                                pageInfo {
                                  hasNextPage
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
                LOGIN: this.username,
                AUTHOR: authorId,
                SINCE: since,
                UNTIL: until,
                REPOS: MAX_REPOS,
                BRANCHES: MAX_BRANCHES_PER_REPO,
                COMMITS: MAX_COMMITS_PER_BRANCH,
            },
        };
    }

    /**
     * Daily commit counts for the user's public repositories, including commits
     * that only exist on non-default branches. Same return shape as
     * `fetchContributions`, so it plugs into the existing graph code.
     */
    public async fetchCommits(
        days: number,
        customFromDate?: string,
        customToDate?: string,
    ): Promise<UserDetails | string> {
        const invalidUser = `Can't fetch any commits. Please check your username 😬`;
        const isCustom = Boolean(customFromDate && customToDate);

        // Inclusive range of UTC days to display
        let firstDay: moment.Moment;
        let lastDay: moment.Moment;
        if (isCustom) {
            firstDay = moment.utc(customFromDate).startOf('day');
            lastDay = moment.utc(customToDate).startOf('day');
        } else {
            lastDay = moment.utc().startOf('day');
            // one extra day, trimmed below if today has no commits yet (mirrors fetchContributions)
            firstDay = moment(lastDay).subtract(days, 'days');
        }
        const since = firstDay.toISOString();
        const until = moment(lastDay).endOf('day').toISOString();

        try {
            const idResponse = await this.fetch<UserIdResponse>(this.getUserIdQuery());
            if (idResponse.data.errors || !idResponse.data.data?.user) {
                if (idResponse.data.errors?.[0]?.type === 'RATE_LIMITED') {
                    return '💥 API rate limit exceeded. Please deploy your own instance.';
                }
                return invalidUser;
            }
            const { id, name } = idResponse.data.data.user;

            const commitsResponse = await this.fetch<CommitsResponse>(
                this.getCommitsQuery(id, since, until),
            );
            if (commitsResponse.data.errors) {
                console.error('API Error: ', commitsResponse.data.errors);
                if (commitsResponse.data.errors[0].type === 'RATE_LIMITED') {
                    return '💥 API rate limit exceeded. Please deploy your own instance.';
                }
                return invalidUser;
            }
            const user = commitsResponse.data.data?.user;
            if (!user) return invalidUser;

            const counts = countCommitsByDay(user.repositories.nodes);

            const contributions: ContributionDay[] = [];
            for (const d = moment(firstDay); d.isSameOrBefore(lastDay); d.add(1, 'day')) {
                contributions.push({
                    contributionCount: counts.get(d.format(DATE_KEY)) ?? 0,
                    date: String(d.date()),
                });
            }

            if (!isCustom) {
                if (contributions[contributions.length - 1].contributionCount === 0) {
                    contributions.pop();
                }
                contributions.splice(0, Math.max(contributions.length - days, 0));
            }

            return { contributions, name: name as string };
        } catch (error) {
            console.log('error: ', error);
            return invalidUser;
        }
    }
}
