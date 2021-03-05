const { fetchContributions, graphqlQuery } = require('../src/fetcher');
const {
  mockQueryCorrect,
  mockQueryIncorrect,
  mockFetchCorrect,
  mockFetchIncorrect,
} = require('./mockFunctions');
const { expectedQuery } = require('./fakeInputs');

//Query Testing ✔
test('Query Test', () => {
  expect(graphqlQuery('ashutosh00710')).toEqual(expectedQuery('ashutosh00710'));
});

//Fetching Contributions Testing ✔
test('Fetching Contributions Test', () => {
  expect.assertions(4);
  fetchContributions('ashutosh00710', mockQueryCorrect, mockFetchCorrect).then(
    (data) => {
      expect(data.contributions).toEqual(expect.any(Array));
      expect(data.contributions.length).toEqual(31);
      expect(data.name).toEqual('Ashutosh Dwivedi');
    }
  );
  fetchContributions('', mockQueryIncorrect, mockFetchIncorrect).then(
    (data) => {
      expect(data).toEqual(
        `Can't fetch any contribution. Please check your username 😬`
      );
    }
  );
});
