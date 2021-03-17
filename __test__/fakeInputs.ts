import { graphArgs } from '../interfaces/interface';

export let fakeQueryString = [
  {
    username: 'githubusername',
  },
  {
    username: 'githubusername',
    bg_color: '44475a',
  },
  {
    username: 'githubusername',
    bg_color: '44475a',
    color: '000000',
  },
  {
    username: 'githubusername',
    bg_color: '44475a',
    color: '000000',
    line: '9e4c98',
  },
  {
    username: 'githubusername',
    bg_color: '44475a',
    color: '000000',
    line: '9e4c98',
    point: '44475a',
  },
  {
    username: 'githubusername',
    bg_color: '44475a',
    color: 'f8f8f2',
    line: 'ff79c6',
    point: 'bd93f9',
    area: true,
  },
  {
    username: 'githubusername',
    bg_color: '44475a',
    color: 'f8f8f2',
    line: 'ff79c6',
    point: 'bd93f9',
    area: true,
    hide_border: true,
  },
];

export let fakeQueryStringRes = [
  {
    username: 'githubusername',
    colors: {
      bgColor: 'ffcfe9',
      borderColor: 'ffffff',
      color: '9e4c98',
      lineColor: '9e4c98',
      pointColor: '403d3d',
    },
    area: false,
  },
  {
    username: 'githubusername',
    colors: {
      bgColor: '44475a',
      borderColor: 'ffffff',
      color: '9e4c98',
      lineColor: '9e4c98',
      pointColor: '403d3d',
    },
    area: false,
  },
  {
    username: 'githubusername',
    colors: {
      bgColor: '44475a',
      borderColor: 'ffffff',
      color: '000000',
      lineColor: '9e4c98',
      pointColor: '403d3d',
    },
    area: false,
  },
  {
    username: 'githubusername',
    colors: {
      bgColor: '44475a',
      borderColor: 'ffffff',
      color: '000000',
      lineColor: '9e4c98',
      pointColor: '403d3d',
    },
    area: false,
  },
  {
    username: 'githubusername',
    colors: {
      bgColor: '44475a',
      borderColor: 'ffffff',
      color: '000000',
      lineColor: '9e4c98',
      pointColor: '44475a',
    },
    area: false,
  },
  {
    username: 'githubusername',
    colors: {
      bgColor: '44475a',
      borderColor: 'ffffff',
      color: 'f8f8f2',
      lineColor: 'ff79c6',
      pointColor: 'bd93f9',
    },
    area: true,
  },
  {
    username: 'githubusername',
    colors: {
      bgColor: '44475a',
      borderColor: '0000',
      color: 'f8f8f2',
      lineColor: 'ff79c6',
      pointColor: 'bd93f9',
    },
    area: true,
  },
];

export let fakeGraphArgs: graphArgs = {
  height: 10,
  width: 20,
  colors: {
    bgColor: '44475a',
    borderColor: '0000',
    color: 'f8f8f2',
    lineColor: 'ff79c6',
    pointColor: 'bd93f9',
  },
  title: 'graphSvg',
  line: Promise.resolve('line'),
};

export let options = {
  width: 10,
  height: 5,
  axisY: {
    title: 'Contributions',
    onlyInteger: true,
    offset: 70,
    labelOffset: {
      y: 4.5,
    },
  },
  axisX: {
    title: 'Days',
    offset: 50,
    labelOffset: {
      x: -4.5,
    },
  },
  chartPadding: {
    top: 80,
    right: 50,
    bottom: 20,
    left: 20,
  },
  showArea: false,
  fullWidth: true,
};

export const expectedQuery = (username: string) => {
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

export const dummyWeeksData = [
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
    ],
  },
];

export const themes = {
  dracula: {
    bgColor: '44475a',
    borderColor: 'ffffff',
    color: 'f8f8f2',
    lineColor: 'ff79c6',
    pointColor: 'bd93f9',
  },
  gruvbox: {
    bgColor: '504945',
    borderColor: 'ffffff',
    color: 'd4be98',
    lineColor: 'd8a657',
    pointColor: 'e78a4e',
  },
  github: {
    bgColor: '293036',
    borderColor: 'ffffff',
    color: 'ffffff',
    lineColor: '9ecbff',
    pointColor: 'f97583',
  },
  rogue: {
    bgColor: '172030',
    borderColor: 'ffffff',
    color: 'a3b09a',
    lineColor: 'b18bb1',
    pointColor: 'c6797e',
  },
  xcode: {
    bgColor: '202124',
    borderColor: 'ffffff',
    color: 'fcfcfa',
    lineColor: 'c4e3ff',
    pointColor: 'ff8070',
  },
  redical: {
    bgColor: '141321',
    borderColor: 'ffffff',
    color: 'a9fef7',
    lineColor: 'fe428e',
    pointColor: 'f8d847',
  },
  coral: {
    bgColor: '9a3838',
    borderColor: 'ffffff',
    color: 'f9fae9',
    lineColor: 'f4e23d',
    pointColor: 'f4e7e7',
  },
  reactDark: {
    bgColor: '0d1117',
    borderColor: 'ffffff',
    color: '5bcdec',
    lineColor: '5bcdec',
    pointColor: 'ffffff',
  },
  nord: {
    bgColor: '2e3440',
    borderColor: 'ffffff',
    color: '88c0d0',
    lineColor: '88c0d0',
    pointColor: 'ffffff',
  },
  lucent: {
    bgColor: 'cccccc',
    borderColor: '000000',
    color: '000000',
    lineColor: 'ffd369',
    pointColor: 'faf3e0',
  },
  default: {
    bgColor: 'ffcfe9',
    borderColor: 'ffffff',
    color: '9e4c98',
    lineColor: '9e4c98',
    pointColor: '403d3d',
  },
};
