const { fetchContributions, graphqlQuery } = require('../src/fetching');
const { mockQuery, mockFetch } = require('./mockFunctions');
const { expectedQuery } = require('./fakeInputs');

//Query Testing ✔
test('Query Test', () => {
  expect(graphqlQuery('ashutosh00710')).toEqual(expectedQuery('ashutosh00710'));
});

//Fetching Contributions Testing ✔
test('Fetching Contributions Test', () => {
  fetchContributions('ashutosh00710', mockQuery, mockFetch).then((data) => {
    expect.assertions(3);
    expect(data.contributions).toEqual(expect.any(Array));
    expect(data.contributions.length).toEqual(31);
    expect(data.name).toEqual('Ashutosh Dwivedi');
  });
});
