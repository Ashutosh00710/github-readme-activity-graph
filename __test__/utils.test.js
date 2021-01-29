const { queryOptions } = require('../src/utils');
const { createGraph } = require('../src/createChart');

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

//- Chart Function ([Promise] Inside Graph Cards Class) ✔
it('Graph Generation', async () => {
  expect.assertions(1);
  let contributions = [1, 2, 3];
  const graph = await createGraph('line', options, {
    labels: Array.from(Array(contributions.length).keys(), (day) => day + 1),
    series: [{ value: contributions }],
  });
  expect(graph).toEqual(expect.any(String));
});
