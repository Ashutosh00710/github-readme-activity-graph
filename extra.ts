import axios, { AxiosResponse } from 'axios';
import { gqlQuery } from './types/types';
import { query } from './interfaces/interface';
import { createGraph } from './src/createChart';

require('dotenv').config();

export const graphqlQuery: gqlQuery = (username: string) => {
  return {
    query: `
      query userInfo($LOGIN: String!) {
       user(login: $LOGIN) {
        name
        issues {
          totalCount
        }
        pullRequests {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
        }  
      }
    },
    `,
    variables: {
      LOGIN: username,
    },
  };
};

interface issues {
  totalCount: number;
}

interface pullRequests {
  totalCount: number;
}

interface contributionsCollection {
  totalCommitContributions: number;
}

interface overviewResponse {
  data: {
    user: {
      name: string;
      issues: issues;
      pullRequests: pullRequests;
      contributionsCollection: contributionsCollection;
    };
  };
}

const token: string | undefined = process.env.TOKEN;

const headers = {
  Authorization: `bearer ${token}`,
};

//Now we have to make fetch generic function
export const fetch = async (
  data: query
): Promise<AxiosResponse<overviewResponse>> =>
  axios({
    url: 'https://api.github.com/graphql',
    method: 'POST',
    headers,
    data,
  });

export const pieData = async (
  username: string,
  graphqlQuery1: gqlQuery,
  fetch: (data: query) => Promise<AxiosResponse<overviewResponse>>
) => {
  const apiResponse = await fetch(graphqlQuery(username));
  const data = apiResponse.data.data.user;
  return [
    data.contributionsCollection.totalCommitContributions,
    data.pullRequests.totalCount,
    data.issues.totalCount,
  ];
};

pieData('ashutosh00710', graphqlQuery, fetch).then(async (data) => {
  const options = { width: 400, height: 200 };

  const bar: Promise<string> = await createGraph('pie', options, {
    series: [
      {
        value: data[0],
        name: 'Commits',
      },
      {
        value: data[1],
        name: 'Pull Request',
      },
      {
        value: data[2],
        name: 'Issues',
      },
    ],
  });

  console.log(bar);
});
