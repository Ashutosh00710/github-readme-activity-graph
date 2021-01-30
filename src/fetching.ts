import axios from 'axios';
import {
  query,
  userDetails,
  week,
  contributionCount,
} from '../interfaces/interface';
import { fetcher, gqlQuery } from '../types/types';

require('dotenv').config('../');

export const graphqlQuery: gqlQuery = (username: string) => {
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
      LOGIN: username,
    },
  };
};

const token: string | undefined = process.env.TOKEN;

const headers = {
  Authorization: `bearer ${token}`,
};

export const fetch: fetcher = (data: query) =>
  axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers,
    data,
  });

export const fetchContributions = async (
  username: string,
  graphqlQuery: gqlQuery,
  fetch: fetcher
): Promise<userDetails | string> => {
  try {
    const apiResponse = await fetch(graphqlQuery(username));
    if (apiResponse.data.data.user === null)
      return `Can't fetch any contribution. Please check your username 😬`;
    else {
      let userData: userDetails = {
        contributions: [],
        name: apiResponse.data.data.user.name,
      };
      const weeks: week[] =
        apiResponse.data.data.user.contributionsCollection.contributionCalendar
          .weeks;
      weeks.slice(weeks.length - 6, weeks.length).map((week: week) =>
        week.contributionDays.map((contributionCount: contributionCount) => {
          userData.contributions.push(contributionCount.contributionCount);
        })
      );

      const presentDay = new Date().getDay();
      //returning data of last 31 days
      userData.contributions = userData.contributions.slice(
        5 + presentDay,
        36 + presentDay
      );
      return userData;
    }
  } catch (error) {
    return error;
  }
};
