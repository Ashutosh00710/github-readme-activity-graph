import express from 'express';
import request from 'supertest';
import { Utilities } from '../src/utils';
import { createGraph } from '../src/createChart';
import { fakeQueryString, fakeQueryStringRes, options } from './fakeInputs';
import { Handlers } from '../src/handlers';

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
        let contributions = [1, 2, 3];

        let date = new Date();
        date.setUTCMonth(8);
        date.setUTCDate(1);
        let contributions_dates = [
            date.toLocaleString('en', { month: 'short' }) + ' ' + date.getUTCDate().toString(), // Sep 1
            date.toLocaleString('en', { month: 'short' }) +
                ' ' +
                (date.getUTCDate() + 1).toString(), // Sep 2
            date.toLocaleString('en', { month: 'short' }) +
                ' ' +
                (date.getUTCDate() + 2).toString(), // Sep 3
        ];
        const graph = await createGraph('line', options, {
            labels: contributions_dates,
            series: [{ value: contributions }],
        });
        expect(graph).toMatchSnapshot();
    });
});
