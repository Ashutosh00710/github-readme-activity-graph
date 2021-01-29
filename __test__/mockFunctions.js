const mockFetch = jest.fn().mockReturnValue(
  Promise.resolve({
    data: {
      data: {
        user: {
          name: 'Ashutosh Dwivedi',
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 389,
              weeks: [
                {
                  contributionDays: [
                    {
                      contributionCount: 2,
                    },
                    {
                      contributionCount: 3,
                    },
                    {
                      contributionCount: 16,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 5,
                    },
                    {
                      contributionCount: 3,
                    },
                    {
                      contributionCount: 0,
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 2,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 5,
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 1,
                    },
                    {
                      contributionCount: 8,
                    },
                    {
                      contributionCount: 5,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 4,
                    },
                    {
                      contributionCount: 8,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 14,
                    },
                    {
                      contributionCount: 6,
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 13,
                    },
                    {
                      contributionCount: 2,
                    },
                    {
                      contributionCount: 10,
                    },
                    {
                      contributionCount: 2,
                    },
                    {
                      contributionCount: 1,
                    },
                    {
                      contributionCount: 5,
                    },
                    {
                      contributionCount: 13,
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 1,
                    },
                    {
                      contributionCount: 3,
                    },
                    {
                      contributionCount: 6,
                    },
                    {
                      contributionCount: 7,
                    },
                    {
                      contributionCount: 2,
                    },
                    {
                      contributionCount: 1,
                    },
                    {
                      contributionCount: 5,
                    },
                  ],
                },
                {
                  contributionDays: [
                    {
                      contributionCount: 11,
                    },
                    {
                      contributionCount: 0,
                    },
                    {
                      contributionCount: 1,
                    },
                    {
                      contributionCount: 12,
                    },
                    {
                      contributionCount: 16,
                    },
                    {
                      contributionCount: 0,
                    },
                  ],
                },
              ],
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
