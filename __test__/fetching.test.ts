import { fetchContributions, graphqlQuery } from '../src/fetcher';
import {
  mockQueryCorrect,
  mockQueryIncorrect,
  mockFetchCorrect,
  mockFetchIncorrect,
} from './mockFunctions';
import { expectedQuery } from './fakeInputs';
import { userDetails } from '../interfaces/interface';

//Query Testing ✔
test('Query Test', () => {
  expect(graphqlQuery('ashutosh00710')).toEqual(expectedQuery('ashutosh00710'));
});

//Fetching Contributions Testing ✔
test('Fetching Contributions Test', () => {
  expect.assertions(4);
  fetchContributions('ashutosh00710', mockQueryCorrect, mockFetchCorrect).then(
    //@ts-ignore: will always return data of type userDetails
    (data: userDetails) => {
      expect(data.contributions).toEqual(expect.any(Array));
      expect(data.contributions.length).toEqual(31);
      expect(data.name).toEqual('Ashutosh Dwivedi');
    }
  );
  fetchContributions('', mockQueryIncorrect, mockFetchIncorrect).then(
    //@ts-ignore: will always return data of type string
    (data: string) => {
      expect(data).toEqual(
        `Can't fetch any contribution. Please check your username 😬`
      );
    }
  );
});
