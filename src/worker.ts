// Cloudflare Worker entry point (see wrangler.jsonc).
// It serves the same routes as the Express app in main.ts, reusing the same
// Utilities / Fetcher / SVG code, but without Express so each request stays cheap.
import { Utilities } from './utils';
import { Fetcher } from './fetcher';
import { invalidUserSvg } from './svgs';
import { ParsedQs } from './interfaces/interface';

export interface Env {
    // GitHub token, set with `npx wrangler secret put TOKEN` or in the dashboard
    TOKEN: string;
}

// Minimal Worker runtime types, so we don't need @cloudflare/workers-types
interface ExecutionContext {
    waitUntil(promise: Promise<unknown>): void;
}
const edgeCache = () => (caches as unknown as { default: Cache }).default;

const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*' };

const svgResponse = (svg: string, cacheControl: string, status = 200) =>
    new Response(svg, {
        status,
        headers: {
            ...CORS_HEADERS,
            'Content-Type': 'image/svg+xml; charset=utf-8',
            'Cache-Control': cacheControl,
        },
    });

const getQuery = (url: URL) => Object.fromEntries(url.searchParams) as unknown as ParsedQs;

async function getGraph(url: URL, env: Env): Promise<Response> {
    try {
        const utils = new Utilities(getQuery(url));
        const queryOptions = utils.queryOptions();
        const fetcher = new Fetcher(utils.username, env.TOKEN);
        const fetchCalendarData = await fetcher.fetchContributions(
            queryOptions.days,
            queryOptions.from,
            queryOptions.to,
        );
        const { finalGraph, header } = await utils.buildGraph(fetchCalendarData);
        return svgResponse(finalGraph, header.maxAge);
    } catch (error) {
        console.error('error: ', error);
        return svgResponse(
            invalidUserSvg('Something unexpected happened 💥'),
            'no-store, max-age=0',
        );
    }
}

async function getData(url: URL, env: Env): Promise<Response> {
    try {
        const utils = new Utilities(getQuery(url));
        const fetcher = new Fetcher(utils.username, env.TOKEN);
        const fetchCalendarData = await fetcher.fetchContributions(utils.queryOptions().days);
        if (typeof fetchCalendarData === 'object') {
            return Response.json(fetchCalendarData, { headers: CORS_HEADERS });
        }
        return svgResponse(invalidUserSvg(fetchCalendarData), 'no-store, max-age=0');
    } catch (error) {
        console.error('error: ', error);
        return svgResponse(
            invalidUserSvg('Something unexpected happened 💥'),
            'no-store, max-age=0',
        );
    }
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: { ...CORS_HEADERS, 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS' },
            });
        }
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
        }

        switch (url.pathname) {
            case '/':
                return new Response('<h1>GitHub Readme Activity Graph 📈</h1>', {
                    headers: { ...CORS_HEADERS, 'Content-Type': 'text/html; charset=utf-8' },
                });

            case '/graph': {
                // Workers run in front of Cloudflare's CDN cache, so cache graphs explicitly.
                // Note: the Cache API only works on a custom domain, not on *.workers.dev.
                const cacheKey = new Request(url.toString(), { method: 'GET' });
                const cached = await edgeCache().match(cacheKey);
                if (cached) return cached;

                const response = await getGraph(url, env);
                if (response.headers.get('Cache-Control')?.startsWith('public')) {
                    ctx.waitUntil(edgeCache().put(cacheKey, response.clone()));
                }
                return response;
            }

            case '/data':
                return getData(url, env);

            default:
                return new Response('Not Found', { status: 404, headers: CORS_HEADERS });
        }
    },
};
