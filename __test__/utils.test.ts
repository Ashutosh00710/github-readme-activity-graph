import express from 'express';
import request from 'supertest';
import { Utilities } from '../src/utils';
import { fakeQueryString, fakeQueryStringRes, options } from './fakeInputs';
import { Handlers } from '../src/handlers';
import { createGraph } from '../src/createChart';

describe('Utilities Test', () => {
    const handlers = new Handlers();
    it('Query Options', () => {
        expect(
            fakeQueryString.map((arg) => {
                const utils = new Utilities(arg);
                return utils.queryOptions();
            })
        ).toEqual(fakeQueryStringRes);
    });

    // Testing express routes
    const fakeServer = () => {
        const app = express();
        app.use(express.urlencoded({ extended: false }));
        return app;
    };

    describe('GET /graph with correct credential', () => {
        test('responding', (done) => {
            const app = fakeServer();
            app.get('/graph', handlers.getGraph);
            request(app)
                .get('/graph?username=ashutosh00710')
                .expect('Content-Type', 'image/svg+xml; charset=utf-8')
                .expect('Cache-Control', 'public, max-age=1800')
                .expect(200, done);
        });
    });

    describe('GET /graph with incorrect credential', () => {
        test('responding', (done) => {
            const app = fakeServer();
            app.get('/graph', handlers.getGraph);
            request(app)
                .get('/graph?username=')
                .expect('Content-Type', 'image/svg+xml; charset=utf-8')
                .expect('Cache-Control', 'no-store, max-age=0')
                .expect(200, done);
        });
    });

    //- Chart Function ([Promise] Inside Graph Cards Class) ✔
    it('Graph Generation', async () => {
        expect.assertions(1);

        const days = [
            {
                contributionCount: 2,
                date: '1',
            },
            {
                contributionCount: 3,
                date: '2',
            },
            {
                contributionCount: 10,
                date: '3',
            },
            {
                contributionCount: 12,
                date: '4',
            },
            {
                contributionCount: 14,
                date: '5',
            },
        ];
        const graph: Promise<string> = await createGraph('line', options, {
            labels: days.map((day) => day.date),
            series: [{ value: days.map((day) => day.contributionCount) }],
        });
        expect(graph).toMatchSnapshot();
    });
});
