import express from 'express';
import request from 'supertest';
import { Utilities } from '../src/utils';
import { fakeQueryString, fakeQueryStringRes } from './fakeInputs';
import { Handlers } from '../src/handlers';
import { Fetcher } from '../src/fetcher';
import { createGraph, ChartOptions } from '../src/createChart';

describe('Utilities Test', () => {
    const handlers = new Handlers();
    it('Query Options', () => {
        expect(
            fakeQueryString.map((arg) => {
                const utils = new Utilities(arg);
                return utils.queryOptions();
            }),
        ).toEqual(fakeQueryStringRes);
    });

    // Testing express routes
    const readBody = (
        // superagent passes the raw Node response stream here
        res: any,
        callback: (err: Error | null, body: string) => void,
    ) => {
        let body = '';
        res.on('data', (chunk: Buffer) => (body += chunk));
        res.on('end', () => callback(null, body));
    };

    const fakeServer = () => {
        const app = express();
        app.use(express.urlencoded({ extended: false }));
        return app;
    };

    describe('GET /graph with correct credential', () => {
        // Stub the GitHub API call so the route can be tested without a token or network
        beforeEach(() => {
            jest.spyOn(Fetcher.prototype, 'fetchContributions').mockResolvedValue({
                name: 'Ashutosh Dwivedi',
                contributions: [2, 3, 10, 12, 14].map((count, i) => ({
                    contributionCount: count,
                    date: String(i + 1),
                })),
            });
        });
        afterEach(() => jest.restoreAllMocks());

        test('responding', (done) => {
            const app = fakeServer();
            app.get('/graph', handlers.getGraph);
            request(app)
                .get('/graph?username=ashutosh00710')
                .buffer(true)
                .parse(readBody)
                .expect('Content-Type', 'image/svg+xml; charset=utf-8')
                .expect('Cache-Control', 'public, max-age=1800')
                .expect((res) => {
                    expect(res.body).toContain("Ashutosh Dwivedi's Contribution Graph");
                    expect(res.body).toContain('class="ct-line"');
                })
                .expect(200, done);
        });
    });

    describe('GET /graph with incorrect credential', () => {
        beforeEach(() => {
            jest.spyOn(Fetcher.prototype, 'fetchContributions').mockResolvedValue(
                `Can't fetch any contribution. Please check your username 😬`,
            );
        });
        afterEach(() => jest.restoreAllMocks());

        test('responding', (done) => {
            const app = fakeServer();
            app.get('/graph', handlers.getGraph);
            request(app)
                .get('/graph?username=')
                .buffer(true)
                .parse(readBody)
                .expect('Content-Type', 'image/svg+xml; charset=utf-8')
                .expect('Cache-Control', 'no-store, max-age=0')
                .expect((res) => {
                    expect(res.body).toContain('Please check your username');
                })
                .expect(200, done);
        });
    });

    //- Chart Function ✔
    const chartOptions = (overrides: Partial<ChartOptions> = {}): ChartOptions => ({
        width: 1200,
        height: 420,
        axisY: {
            title: 'Contributions',
            onlyInteger: true,
            offset: 70,
            labelOffset: { x: 0, y: 4.5 },
            low: 0,
            scaleMinSpace: 20,
            showGrid: true,
        },
        axisX: {
            title: 'Days',
            offset: 50,
            labelOffset: { x: -4.5, y: 0 },
            showGrid: true,
        },
        chartPadding: { top: 80, right: 50, bottom: 20, left: 20 },
        showArea: false,
        ...overrides,
    });
    const labels = ['1', '2', '3', '4', '5'];
    const values = [2, 3, 10, 12, 14];

    it('Graph Generation', () => {
        expect(createGraph(chartOptions(), labels, values)).toMatchSnapshot();
    });

    it('Graph Generation with area', () => {
        const svg = createGraph(chartOptions({ showArea: true }), labels, values);
        expect(svg).toContain('class="ct-area"');
        expect(svg).toMatchSnapshot();
    });

    it('Graph Generation handles flat, single and empty series', () => {
        const flat = createGraph(chartOptions(), labels, [0, 0, 0, 0, 0]);
        expect(flat).toContain('class="ct-line"');
        expect(flat).not.toContain('NaN');

        const single = createGraph(chartOptions({ showArea: true }), ['1'], [5]);
        expect(single).toContain('d="M90,80"');
        expect(single).not.toContain('class="ct-area"');
        expect(single).not.toContain('NaN');

        const empty = createGraph(chartOptions(), [], []);
        expect(empty).not.toContain('class="ct-line"');
        expect(empty).not.toContain('NaN');
    });

    it('Graph Generation escapes label text', () => {
        expect(createGraph(chartOptions(), ['<b>&'], [1])).toContain('&lt;b&gt;&amp;</text>');
    });
});
