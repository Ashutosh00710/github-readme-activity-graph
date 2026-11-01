import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { optionsFromEnv, run } from '../src/cli';
import { Fetcher } from '../src/fetcher';

jest.mock('../src/fetcher');
const mockFetch = Fetcher.prototype.fetchContributions as jest.Mock;

const contributions = Array.from({ length: 31 }, (_, i) => ({
    contributionCount: i % 5,
    date: String(i + 1),
}));

describe('CLI Tests', () => {
    let dir: string;
    beforeEach(async () => {
        dir = await fs.mkdtemp(path.join(os.tmpdir(), 'activity-graph-'));
        mockFetch.mockReset();
    });
    afterEach(() => fs.rm(dir, { recursive: true, force: true }));

    it('maps ACTIVITY_* variables to query options', () => {
        expect(
            optionsFromEnv({
                ACTIVITY_USERNAME: 'octocat',
                ACTIVITY_THEME: 'github-light',
                ACTIVITY_CUSTOM_TITLE: "Octocat's graph",
                ACTIVITY_HIDE_BORDER: 'TRUE',
                ACTIVITY_AREA: 'false',
                ACTIVITY_RADIUS: '8',
                ACTIVITY_DAYS: '60',
            }),
        ).toEqual({
            username: 'octocat',
            theme: 'github-light',
            custom_title: "Octocat's graph",
            hide_border: true,
            area: false,
            radius: 8,
            days: '60',
        });
    });

    it('treats empty action inputs as unset', () => {
        expect(
            optionsFromEnv({
                ACTIVITY_USERNAME: 'octocat',
                ACTIVITY_THEME: '',
                ACTIVITY_HEIGHT: '',
                ACTIVITY_HIDE_TITLE: '  ',
            }),
        ).toEqual({ username: 'octocat' });
    });

    it('writes the graph SVG to output_path, creating directories', async () => {
        mockFetch.mockResolvedValue({ name: 'The Octocat', contributions });
        const outputPath = path.join(dir, 'nested', 'graph.svg');

        await run({
            TOKEN: 'token',
            ACTIVITY_USERNAME: 'octocat',
            ACTIVITY_OUTPUT_PATH: outputPath,
        });

        const svg = await fs.readFile(outputPath, 'utf8');
        expect(svg).toContain('<svg');
        expect(svg).toContain("The Octocat's Contribution Graph");
        expect(mockFetch).toHaveBeenCalledWith(31, '', '');
    });

    it('fails instead of writing the error SVG when fetching fails', async () => {
        mockFetch.mockResolvedValue(`Can't fetch any contribution. Please check your username 😬`);
        const outputPath = path.join(dir, 'graph.svg');

        await expect(
            run({ TOKEN: 'token', ACTIVITY_USERNAME: 'nobody', ACTIVITY_OUTPUT_PATH: outputPath }),
        ).rejects.toThrow("Can't fetch any contribution");
        await expect(fs.access(outputPath)).rejects.toThrow();
    });

    it('requires a username and a token', async () => {
        await expect(run({ TOKEN: 'token' })).rejects.toThrow('ACTIVITY_USERNAME is required');
        await expect(run({ ACTIVITY_USERNAME: 'octocat' })).rejects.toThrow('TOKEN is required');
    });
});
