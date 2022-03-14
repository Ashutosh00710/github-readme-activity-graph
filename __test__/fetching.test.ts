import { Fetcher } from '../src/fetcher';
import {
    mockQueryCorrect,
    mockQueryIncorrect,
    mockFetchCorrect,
    mockFetchIncorrect,
} from './mockFunctions';
import { expectedQuery } from './fakeInputs';
import { UserDetails } from '../src/interfaces/interface';

describe('Fetching Tests', () => {
    const fetcher = new Fetcher('ashutosh00710');
    it('Query Test', () => {
        // @ts-ignore: testing private method
        expect(fetcher.getGraphQLQuery('ashutosh00710')).toEqual(expectedQuery('ashutosh00710'));
    });

    it('Fetching Contributions Test', () => {
        // @ts-ignore: mocking private method
        fetcher.getGraphQLQuery = mockQueryCorrect;
        // @ts-ignore: mocking private method
        fetcher.fetch = mockFetchCorrect;

        fetcher.fetchContributions().then(
            //@ts-ignore: will always return data of type userDetails
            (data: UserDetails) => {
                expect(data.contributions).toEqual(expect.any(Array));
                expect(data.contributions.length).toEqual(31);
                expect(data.name).toEqual('Ashutosh Dwivedi');
            }
        );

        // @ts-ignore: mocking private method
        fetcher.getGraphQLQuery = mockQueryIncorrect;
        // @ts-ignore: mocking private method
        fetcher.fetch = mockFetchIncorrect;

        // @ts-ignore: this will always return a string
        fetcher.fetchContributions().then((data: string) => {
            expect(data).toEqual(`Can't fetch any contribution. Please check your username 😬`);
        });
    });
});
