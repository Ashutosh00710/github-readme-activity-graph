import { GraphArgs } from '../src/interfaces/interface';

export let fakeQueryString = [
    {
        username: 'githubusername',
        radius: 8,
        hide_title: false,
        custom_title: undefined,
        title_color: "ffffff",
    },
    {
        username: 'githubusername',
        radius: -10,
        bg_color: '44475a',
        hide_title: false,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        radius: 35,
        bg_color: '44475a',
        color: '000000',
        hide_title: false,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        bg_color: '44475a',
        color: '000000',
        line: '9e4c98',
        hide_title: false,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        bg_color: '44475a',
        color: '000000',
        line: '9e4c98',
        point: '44475a',
        hide_title: false,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        bg_color: '44475a',
        color: 'f8f8f2',
        line: 'ff79c6',
        point: 'bd93f9',
        area: true,
        hide_title: false,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        bg_color: '44475a',
        color: 'f8f8f2',
        line: 'ff79c6',
        point: 'bd93f9',
        area: true,
        hide_border: true,
        hide_title: false,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        bg_color: '44475a',
        color: 'f8f8f2',
        line: 'ff79c6',
        point: 'bd93f9',
        area: true,
        hide_border: true,
        hide_title: true,
        custom_title: undefined,
    },
    {
        username: 'githubusername',
        bg_color: '44475a',
        color: 'f8f8f2',
        line: 'ff79c6',
        point: 'bd93f9',
        area: true,
        hide_border: true,
        custom_title: 'some title',
    },
];

export let fakeQueryStringRes = [
    {
        username: 'githubusername',
        radius: 8,
        colors: {
            areaColor: '9e4c98',
            bgColor: 'ffcfe9',
            borderColor: 'ffffff',
            color: '9e4c98',
            titleColor: 'ffffff',
            lineColor: '9e4c98',
            pointColor: '403d3d',
        },
        hide_title: false,
        area: false,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: 'ffffff',
            color: '9e4c98',
            titleColor: '9e4c98',
            lineColor: '9e4c98',
            pointColor: '403d3d',
        },
        hide_title: false,
        area: false,
    },
    {
        username: 'githubusername',
        radius: 16,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: 'ffffff',
            color: '000000',
            titleColor: '000000',
            lineColor: '9e4c98',
            pointColor: '403d3d',
        },
        hide_title: false,
        area: false,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: 'ffffff',
            color: '000000',
            titleColor: '000000',
            lineColor: '9e4c98',
            pointColor: '403d3d',
        },
        hide_title: false,
        area: false,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: 'ffffff',
            color: '000000',
            titleColor: '000000',
            lineColor: '9e4c98',
            pointColor: '44475a',
        },
        hide_title: false,
        area: false,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: 'ffffff',
            color: 'f8f8f2',
            titleColor: 'f8f8f2',
            lineColor: 'ff79c6',
            pointColor: 'bd93f9',
        },
        hide_title: false,
        area: true,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: '0000',
            color: 'f8f8f2',
            titleColor: 'f8f8f2',
            lineColor: 'ff79c6',
            pointColor: 'bd93f9',
        },
        area: true,
        hide_title: false,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: '0000',
            color: 'f8f8f2',
            titleColor: 'f8f8f2',
            lineColor: 'ff79c6',
            pointColor: 'bd93f9',
        },
        area: true,
        hide_title: true,
    },
    {
        username: 'githubusername',
        radius: 0,
        colors: {
            areaColor: '9e4c98',
            bgColor: '44475a',
            borderColor: '0000',
            color: 'f8f8f2',
            titleColor: 'f8f8f2',
            lineColor: 'ff79c6',
            pointColor: 'bd93f9',
        },
        area: true,
        hide_title: false,
        custom_title: 'some title',
    },
];

export let fakeGraphArgs: GraphArgs = {
    height: 10,
    width: 20,
    radius: 0,
    colors: {
        areaColor: '87ceeb',
        bgColor: '44475a',
        borderColor: '0000',
        color: 'f8f8f2',
        titleColor: 'f8f8f2',
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

export const expectedQuery = (username: string, from: string, to: string) => {
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
                LOGIN: username,
                FROM: from,
                TO: to,
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
        areaColor: 'ff79c6',
        bgColor: '44475a',
        borderColor: 'ffffff',
        color: 'f8f8f2',
        titleColor: 'f8f8f2',
        lineColor: 'ff79c6',
        pointColor: 'bd93f9',
    },
    gruvbox: {
        areaColor: 'd8a657',
        bgColor: '504945',
        borderColor: 'ffffff',
        color: 'd4be98',
        titleColor: 'd4be98',
        lineColor: 'd8a657',
        pointColor: 'e78a4e',
    },
    github: {
        areaColor: '9ecbff',
        bgColor: '293036',
        borderColor: 'ffffff',
        color: 'ffffff',
        titleColor: 'ffffff',
        lineColor: '9ecbff',
        pointColor: 'f97583',
    },
    rogue: {
        areaColor: 'b18bb1',
        bgColor: '172030',
        borderColor: 'ffffff',
        color: 'a3b09a',
        titleColor: 'a3b09a',
        lineColor: 'b18bb1',
        pointColor: 'c6797e',
    },
    xcode: {
        areaColor: 'c4e3ff',
        bgColor: '202124',
        borderColor: 'ffffff',
        color: 'fcfcfa',
        titleColor: 'fcfcfa',
        lineColor: 'c4e3ff',
        pointColor: 'ff8070',
    },
    redical: {
        areaColor: 'fe428e',
        bgColor: '141321',
        borderColor: 'ffffff',
        color: 'a9fef7',
        titleColor: 'a9fef7',
        lineColor: 'fe428e',
        pointColor: 'f8d847',
    },
    coral: {
        areaColor: 'f4e23d',
        bgColor: '9a3838',
        borderColor: 'ffffff',
        color: 'f9fae9',
        titleColor: 'f9fae9',
        lineColor: 'f4e23d',
        pointColor: 'f4e7e7',
    },
    reactDark: {
        areaColor: '5bcdec',
        bgColor: '0d1117',
        borderColor: 'ffffff',
        color: '5bcdec',
        titleColor: '5bcdec',
        lineColor: '5bcdec',
        pointColor: 'ffffff',
    },
    nord: {
        areaColor: '88c0d0',
        bgColor: '2e3440',
        borderColor: 'ffffff',
        color: '88c0d0',
        titleColor: '88c0d0',
        lineColor: '88c0d0',
        pointColor: 'ffffff',
    },
    lucent: {
        areaColor: 'ffd369',
        bgColor: 'cccccc',
        borderColor: '000000',
        color: '000000',
        titleColor: '000000',
        lineColor: 'ffd369',
        pointColor: 'faf3e0',
    },
    chartreuseDark: {
        areaColor: '00adfe',
        bgColor: '000000',
        borderColor: '000000',
        color: '7ffe00',
        titleColor: '7ffe00',
        lineColor: '00adfe',
        pointColor: '7ffe00',
    },
    githubLight: {
        areaColor: '9be9a8',
        bgColor: 'ffffff',
        borderColor: 'ffffff',
        color: '000000',
        titleColor: '000000',
        lineColor: '9be9a8',
        pointColor: '40c463',
    },
    minimal: {
        areaColor: 'd3e6fa',
        bgColor: 'ffffff',
        borderColor: 'ffffff',
        color: '000000',
        titleColor: '000000',
        lineColor: 'd3e6fa',
        pointColor: '3f99ed',
    },
    materialPalenight: {
        areaColor: 'c792ea',
        bgColor: '292d3e',
        borderColor: 'ffffff',
        color: 'a6accd',
        titleColor: 'a6accd',
        lineColor: 'c792ea',
        pointColor: '89ddff',
    },
    green: {
        areaColor: '588157',
        borderColor: 'ffffff',
        bgColor: 'dad7cd',
        color: '3a5a40',
        titleColor: '3a5a40',
        lineColor: '588157',
        pointColor: '344e41',
    },
    gotham: {
        areaColor: '2aa889',
        bgColor: '0c1014',
        borderColor: '2aa889',
        color: '2aa889',
        titleColor: '2aa889',
        lineColor: '599cab',
        pointColor: '99d1ce',
    },
    noctis_minimus: {
        areaColor: '72b7c0',
        borderColor: 'ffffff',
        bgColor: '1b2932',
        color: 'd3b692',
        titleColor: 'd3b692',
        lineColor: '72b7c0',
        pointColor: 'c5cdd3',
    },
    one_dark: {
        areaColor: 'e5c17c',
        borderColor: 'ffffff',
        bgColor: '282C34',
        color: 'abb2bf',
        titleColor: 'abb2bf',
        lineColor: 'e5c17c',
        pointColor: 'e06c75',
    },
    monokai: {
        areaColor: 'ff6188',
        borderColor: 'ffffff',
        bgColor: '2D2A2E',
        color: 'fcfcfa',
        titleColor: 'fcfcfa',
        lineColor: 'ff6188',
        pointColor: 'ffd866',
    },
    'synthwave-84': {
        areaColor: '3A2442',
        borderColor: '251e30',
        bgColor: '2C223B',
        color: 'FF3CA2',
        titleColor: 'FF3CA2',
        lineColor: 'F7F645',
        pointColor: '22E5F4',
    },
    aqua: {
        areaColor: '226d64',
        borderColor: '161e2d',
        bgColor: '52b69a',
        color: '187177',
        titleColor: '187177',
        lineColor: '226d64',
        pointColor: '156f69',
    },
    default: {
        areaColor: '9e4c98',
        bgColor: 'ffcfe9',
        borderColor: 'ffffff',
        color: '9e4c98',
        titleColor: '9e4c98',
        lineColor: '9e4c98',
        pointColor: '403d3d',
    },
};
