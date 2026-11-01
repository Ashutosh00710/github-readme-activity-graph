import { format } from 'util';
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
            '2022-06-01T00:00:00.000+00:00',
        );
        expect(
            // @ts-ignore: testing private method
            fetcher.getGraphQLQuery(
                '2022-05-01T00:00:00.000+00:00',
                '2022-06-01T00:00:00.000+00:00',
            ),
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
            },
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

describe('Fetching error logging', () => {
    // format() renders arguments the same way console.log does
    const logged = (spy: jest.SpyInstance) =>
        spy.mock.calls.map((args) => format(...args)).join('\n');

    it('never logs the token carried on a failed request', async () => {
        const token = 'ghp_secretTokenValue123';
        // axios attaches the request config, including headers, to thrown errors
        const error = Object.assign(new Error('Request failed with status code 401'), {
            config: { headers: { Authorization: `bearer ${token}` } },
        });
        const fetcher = new Fetcher('octocat');
        // @ts-ignore: mocking private method
        fetcher.fetch = jest.fn().mockRejectedValue(error);
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
            await fetcher.fetchContributions(31);
            await fetcher.fetchContributions(31);
            // @ts-ignore: mocking private method
            fetcher.fetch = jest.fn().mockRejectedValue(error.config);
            await fetcher.fetchContributions(31);

            const output = logged(logSpy) + logged(errorSpy);
            expect(output).toContain('Request failed with status code 401');
            expect(output).not.toContain(token);
        } finally {
            logSpy.mockRestore();
            errorSpy.mockRestore();
        }
    });
});
