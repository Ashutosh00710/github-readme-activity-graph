import axios from 'axios';
import {
  contributionData,
  dailyContribution,
  query,
} from '../interfaces/interface';

require('dotenv').config('../');

const graphqlQuery = (username: string): query => {
  return {
    query: `
      query userInfo($LOGIN: String!) {
       user(login: $LOGIN) {
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

const fetch = async (data: query) =>
  await axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers,
    data,
  });

export const fetchContributions = async (
  username: string
): Promise<number[] | string> => {
  const apiResponse = await fetch(graphqlQuery(username));
  if (apiResponse.data.data.user === null)
    return `Can't fetch any contribution. Please check your username 😬`;
  else {
    const contributions: number[] = [];
    const arr: contributionData[] =
      apiResponse.data.data.user.contributionsCollection.contributionCalendar
        .weeks;
    arr.slice(arr.length - 5, arr.length).map((el: contributionData) =>
      el.contributionDays.map((el: dailyContribution) => {
        contributions.push(el.contributionCount);
      })
    );
    //returning data of last 31 days
    return contributions.slice(4, 35);
  }
};
