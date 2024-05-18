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
        const expected = expectedQuery(
            'ashutosh00710',
            '2022-05-01T00:00:00.000+00:00',
            '2022-06-01T00:00:00.000+00:00'
        );
        expect(
            // @ts-ignore: testing private method
            fetcher.getGraphQLQuery(
                '2022-05-01T00:00:00.000+00:00',
                '2022-06-01T00:00:00.000+00:00'
            )
        ).toEqual(expected);
    });

    it('Fetching Contributions Test', () => {
        // @ts-ignore: mocking private method
        fetcher.getGraphQLQuery = mockQueryCorrect;
        // @ts-ignore: mocking private method
        fetcher.fetch = mockFetchCorrect;

        fetcher.fetchContributions(31).then(
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
