let fakeQueryString = [
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
];

let fakeQueryStringRes = [
  {
    username: 'githubusername',
    colors: {
      bgColor: 'ffcfe9',
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
      color: 'f8f8f2',
      lineColor: 'ff79c6',
      pointColor: 'bd93f9',
    },
    area: true,
  },
];

let options = {
  width: this.width,
  height: this.height,
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
  showArea: this.area,
  fullWidth: true,
};

module.exports = { fakeQueryString, fakeQueryStringRes, options };
