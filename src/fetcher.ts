import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import {
    Query,
    UserDetails,
    Week,
    ContributionCount,
    ResponseOfApi,
} from 'src/interfaces/interface';

dotenv.config();

export class Fetcher {
    constructor(private readonly username: string) {}

    private getGraphQLQuery() {
        return {
            query: `
      query userInfo($LOGIN: String!) {
       user(login: $LOGIN) {
         name
         contributionsCollection {
           contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                }
              }
            }
          }
        }
      },
    `,
            variables: {
                LOGIN: this.username,
            },
        };
    }

    private async fetch(graphQLQuery: Query): Promise<AxiosResponse<ResponseOfApi>> {
        return axios({
            url: 'https://api.github.com/graphql',
            method: 'POST',
            headers: {
                Authorization: `bearer ${process.env.TOKEN}`,
            },
            data: graphQLQuery,
        });
    }

    public async fetchContributions(): Promise<UserDetails | string> {
        try {
            const apiResponse = await this.fetch(this.getGraphQLQuery());
            if (apiResponse.data.data.user === null)
                return `Can't fetch any contribution. Please check your username 😬`;
            else {
                const userData: UserDetails = {
                    contributions: [],
                    name: apiResponse.data.data.user.name,
                };
                //filtering the week data from API response
                const weeks =
                    apiResponse.data.data.user.contributionsCollection.contributionCalendar.weeks;
                //slicing last 6 weeks
                weeks.slice(weeks.length - 6, weeks.length).map((week: Week) =>
                    week.contributionDays.map((contributionCount: ContributionCount) => {
                        userData.contributions.push(contributionCount.contributionCount);
                    })
                );

                //returning data of last 31 days
                const presentDay = new Date().getDay();
                userData.contributions = userData.contributions.slice(
                    5 + presentDay,
                    36 + presentDay
                );
                return userData;
            }
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
}
