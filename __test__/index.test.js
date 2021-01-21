const axios = require('axios');
const { queryOptions, calendarData } = require('../src/utils');
const { createGraph } = require('../src/createChart');
const { graphSvg, invalidUserSvg } = require('../src/svgs');

const {
  fakeQueryString,
  fakeQueryStringRes,
  fakeGraphArgs,
  options,
} = require('./inputs.index');

//- Query Option Function (utils.ts) ✔
it('Query Options', () => {
  expect(fakeQueryString.map((arg) => queryOptions(arg))).toEqual(
    fakeQueryStringRes
  );
});

//- Calendar Data Function (Promise) ✔
it('Calander Data', async () => {
  expect.assertions(2);
  const data = await calendarData('ashutosh00710', axios);
  expect(data).toEqual(expect.any(Array));
  const userNotFound = await calendarData('', axios);
  expect(userNotFound).toEqual(expect.any(String));
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

//- Svg testing ✔
it('Test SVGs', () => {
  let fakeInvalidSvgArg = 'User not found!';
  expect.assertions(2);
  expect(graphSvg(fakeGraphArgs)).toEqual(expect.any(String));
  expect(invalidUserSvg(fakeInvalidSvgArg)).toEqual(expect.any(String));
});
