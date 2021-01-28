import axios from 'axios';
import {
  contributionData,
  dailyContribution,
  query,
  userDetails,
} from '../interfaces/interface';

require('dotenv').config('../');

const graphqlQuery = (username: string): query => {
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

const fetch = async (data: query) =>
  await axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers,
    data,
  });

export const fetchContributions = async (
  username: string
): Promise<userDetails | string> => {
  const apiResponse = await fetch(graphqlQuery(username));
  if (apiResponse.data.data.user === null)
    return `Can't fetch any contribution. Please check your username 😬`;
  else {
    let userData: userDetails = {
      contributions: [],
      name: apiResponse.data.data.user.name,
    };
    const arr: contributionData[] =
      apiResponse.data.data.user.contributionsCollection.contributionCalendar
        .weeks;
    arr.slice(arr.length - 6, arr.length).map((el: contributionData) =>
      el.contributionDays.map((el: dailyContribution) => {
        userData.contributions.push(el.contributionCount);
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
};
