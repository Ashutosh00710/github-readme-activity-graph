const { dummyWeeksData } = require('./fakeInputs');

const weeks = () => {
  for (let i = 1; i <= new Date().getDay(); i++) {
    dummyWeeksData[6].contributionDays.push({
      contributionCount: 0,
    });
  }
  return dummyWeeksData;
};

const mockFetch = jest.fn().mockReturnValue(
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

const mockQuery = jest.fn().mockReturnValue({
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

module.exports = {
  mockFetch,
  mockQuery,
};
