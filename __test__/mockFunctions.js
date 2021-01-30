const { dummyWeeksData } = require('./fakeInputs');

const weeks = () => {
  for (let i = 1; i <= new Date().getDay(); i++) {
    dummyWeeksData[6].contributionDays.push({
      contributionCount: 0,
    });
  }
  return dummyWeeksData;
};

//For valid username
const mockFetchCorrect = jest.fn().mockReturnValue(
  Promise.resolve({
    data: {
      data: {
        user: {
          name: 'Ashutosh Dwivedi',
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 389,
              weeks: weeks(),
            },
          },
        },
      },
    },
  })
);

//For invalid username
const mockFetchIncorrect = jest.fn().mockReturnValue({
  data: {
    data: {
      user: null,
    },
    errors: [
      {
        type: 'NOT_FOUND',
        path: ['user'],
        locations: [
          {
            line: 2,
            column: 3,
          },
        ],
        message: "Could not resolve to a User with the login of 'xyz'.",
      },
    ],
  },
});

//For valid username
const mockQueryCorrect = jest.fn().mockReturnValue({
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
    LOGIN: 'ashutosh00710',
  },
});

//For invalid username
const mockQueryIncorrect = jest.fn().mockReturnValue({
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
    LOGIN: '',
  },
});

module.exports = {
  mockFetchCorrect,
  mockFetchIncorrect,
  mockQueryCorrect,
  mockQueryIncorrect,
};
