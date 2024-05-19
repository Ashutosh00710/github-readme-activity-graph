import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import moment from 'moment';
import { Query, UserDetails, Week, ContributionDay, ResponseOfApi } from 'src/interfaces/interface';

dotenv.config();

export class Fetcher {
    constructor(private readonly username: string) {}

    private getGraphQLQuery(from: string, to: string) {
        return {
            query: `
              query userInfo($LOGIN: String!, $FROM: DateTime!, $TO: DateTime!) {
                user(login: $LOGIN) {
                  name
                  contributionsCollection(from: $FROM, to: $TO) {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
                LOGIN: this.username,
                FROM: from,
                TO: to,
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

    public async fetchContributions(
        days: number,
        customFromDate?: string,
        customToDate?: string
    ): Promise<UserDetails | string> {
        let from = '',
            to = '';
        if (customFromDate && customToDate) {
            from = moment(customFromDate).utc().toISOString(true);
            to = moment(customToDate).utc().toISOString(true);
        } else {
            const now = moment();
            from = moment(now).subtract(days, 'days').utc().toISOString();
            // also include the next day in case our server is behind in time with respect to GitHub
            to = moment(now).add(1, 'days').utc().toISOString();
        }

        try {
            const apiResponse = await this.fetch(this.getGraphQLQuery(from, to));
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
                // get day-contribution data
                weeks.map((week: Week) =>
                    week.contributionDays.map((contributionDay: ContributionDay) => {
                        contributionDay.date = moment(contributionDay.date, moment.ISO_8601)
                            .date()
                            .toString();
                        userData.contributions.push(contributionDay);
                    })
                );

                // if 32nd entry is 0 means:
                // either the day hasn't really started
                // or the user hasn't contributed today
                const length = userData.contributions.length;
                if (!(customFromDate && customToDate)) {
                    if (userData.contributions[length - 1].contributionCount === 0) {
                        userData.contributions.pop();
                    }
                    const extra = userData.contributions.length - days;
                    userData.contributions.splice(0, extra);
                }
                return userData;
            }
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    }
}
