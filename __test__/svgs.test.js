const { graphSvg, invalidUserSvg } = require('../src/svgs');
const { Card } = require('../src/GraphCards');
const { fakeGraphArgs, fakeQueryStringRes } = require('./fakeInputs');

//- Svg testing ✔
it('Test SVGs', () => {
  let fakeInvalidSvgArg = 'User not found!';
  expect.assertions(2);
  expect(graphSvg(fakeGraphArgs)).toEqual(expect.any(String));
  expect(invalidUserSvg(fakeInvalidSvgArg)).toEqual(expect.any(String));
});

//- Svg testing Promise<string> (GrapgCards.ts)✔
it('chart SVGs', async () => {
  expect.assertions(1);
  expect(
    await new Card(
      420,
      1200,
      fakeQueryStringRes[0].colors,
      "xyz's Contribution Graph",
      fakeQueryStringRes[0].area
    ).chart([1, 2, 3, 4, 5])
  ).toEqual(expect.any(String));
});
