import express from 'express';
import request from 'supertest';
import { queryOptions, getGraph } from '../src/utils';
import { createGraph } from '../src/createChart';
import {
  mockQueryCorrect,
  mockQueryIncorrect,
  mockFetchCorrect,
  mockFetchIncorrect,
} from './mockFunctions';
import { fakeQueryString, fakeQueryStringRes, options } from './fakeInputs';

//- Query Option Function (utils.ts) ✔
it('Query Options', () => {
  expect(fakeQueryString.map((arg) => queryOptions(arg))).toEqual(
    fakeQueryStringRes
  );
});

//Testing express routes
const fakeSurver = () => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  return app;
};

describe('GET /graph with correct credential', () => {
  test('responding', (done) => {
    const app = fakeSurver();
    app.get('/graph', getGraph(mockQueryCorrect, mockFetchCorrect));
    request(app)
      .get('/graph?username=ashutosh00710')
      .expect('Content-Type', 'image/svg+xml; charset=utf-8')
      .expect('Cache-Control', 'public, max-age=1800')
      .expect(200, done);
  });
});

describe('GET /graph with incorrect credential', () => {
  test('responding', (done) => {
    const app = fakeSurver();
    app.get('/graph', getGraph(mockQueryIncorrect, mockFetchIncorrect));
    request(app)
      .get('/graph?username=')
      .expect('Content-Type', 'image/svg+xml; charset=utf-8')
      .expect('Cache-Control', 'no-store, max-age=0')
      .expect(200, done);
  });
});

//- Chart Function ([Promise] Inside Graph Cards Class) ✔
test('Graph Generation', async () => {
  expect.assertions(1);
  let contributions = [1, 2, 3];

  let date = new Date();
  date.setUTCMonth(8);
  date.setUTCDate(1);
  let contributions_dates = [
    date.toLocaleString('default', { month: 'short' }) +
      ' ' +
      date.getUTCDate().toString(), // Sep 1
    date.toLocaleString('default', { month: 'short' }) +
      ' ' +
      (date.getUTCDate() + 1).toString(), // Sep 2
    date.toLocaleString('default', { month: 'short' }) +
      ' ' +
      (date.getUTCDate() + 2).toString(), // Sep 3
  ];
  const graph = await createGraph('line', options, {
    labels: contributions_dates,
    series: [{ value: contributions }],
  });
  expect(graph).toMatchSnapshot();
});
