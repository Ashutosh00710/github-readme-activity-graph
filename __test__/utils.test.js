const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const { queryOptions, getGraph } = require('../src/utils');
const { createGraph } = require('../src/createChart');
const {
  mockQueryCorrect,
  mockQueryIncorrect,
  mockFetchCorrect,
  mockFetchIncorrect,
} = require('./mockFunctions');
const {
  fakeQueryString,
  fakeQueryStringRes,
  options,
} = require('./fakeInputs');

//- Query Option Function (utils.ts) ✔
it('Query Options', () => {
  expect(fakeQueryString.map((arg) => queryOptions(arg))).toEqual(
    fakeQueryStringRes
  );
});

//Testing express routes
const fakeSurver = () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  return app;
};

describe('GET /graph with correct credential', () => {
  it('responding', (done) => {
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
  it('responding', (done) => {
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
it('Graph Generation', async () => {
  expect.assertions(1);
  let contributions = [1, 2, 3];
  const graph = await createGraph('line', options, {
    labels: Array.from(Array(contributions.length).keys(), (day) => day + 1),
    series: [{ value: contributions }],
  });
  expect(graph).toMatchSnapshot();
});
