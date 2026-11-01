import { promises as fs } from 'fs';
import path from 'path';
import { Fetcher } from './fetcher';
import { Utilities } from './utils';
import { ParsedQs } from './interfaces/interface';

type Env = Record<string, string | undefined>;

// Action inputs reach the CLI as ACTIVITY_<NAME> environment variables, named
// after the query parameters the web endpoint accepts.
const STRING_OPTIONS = [
    'custom_title',
    'theme',
    'bg_color',
    'color',
    'title_color',
    'line',
    'point',
    'area_color',
    'border_color',
    'days',
    'from',
    'to',
    'grid',
] as const;
const BOOLEAN_OPTIONS = ['hide_title', 'hide_border', 'area'] as const;
const NUMBER_OPTIONS = ['radius', 'height'] as const;

function read(env: Env, name: string): string | undefined {
    // Unset action inputs arrive as empty strings; treat them as not given.
    const value = env[`ACTIVITY_${name.toUpperCase()}`]?.trim();
    return value ? value : undefined;
}

export function optionsFromEnv(env: Env): ParsedQs {
    const options: ParsedQs = { username: read(env, 'username') };
    for (const name of STRING_OPTIONS) {
        const value = read(env, name);
        if (value !== undefined) options[name] = value;
    }
    for (const name of BOOLEAN_OPTIONS) {
        const value = read(env, name);
        if (value !== undefined) options[name] = value.toLowerCase() === 'true';
    }
    for (const name of NUMBER_OPTIONS) {
        const value = Number(read(env, name));
        if (Number.isFinite(value)) options[name] = value;
    }
    return options;
}

// Fetches the contribution data and writes the graph SVG to outputPath.
// Throws instead of writing the "invalid user" SVG, so a failed run doesn't
// get committed as if it were a graph.
export async function run(env: Env): Promise<string> {
    const options = optionsFromEnv(env);
    if (!options.username) throw new Error('ACTIVITY_USERNAME is required');
    if (!env.TOKEN) throw new Error('TOKEN is required to call the GitHub API');

    const utils = new Utilities(options);
    const { days, from, to } = utils.queryOptions();
    const data = await new Fetcher(utils.username).fetchContributions(days, from, to);
    if (typeof data === 'string') throw new Error(data);

    const { finalGraph } = await utils.buildGraph(data);
    const outputPath = read(env, 'output_path') ?? 'activity-graph.svg';
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, finalGraph);
    return outputPath;
}

if (require.main === module) {
    run(process.env)
        .then((outputPath) => console.log(`Wrote ${outputPath}`))
        .catch((error: unknown) => {
            console.error(error instanceof Error ? error.message : String(error));
            process.exit(1);
        });
}
