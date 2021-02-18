import { colors } from '../interfaces/interface';

export const selectColors = (queryString: string): colors => {
  switch (queryString) {
    case 'dracula':
      return {
        bgColor: '44475a',
        borderColor: 'ffffff',
        color: 'f8f8f2',
        lineColor: 'ff79c6',
        pointColor: 'bd93f9',
      };
    case 'gruvbox':
      return {
        bgColor: '504945',
        borderColor: 'ffffff',
        color: 'd4be98',
        lineColor: 'd8a657',
        pointColor: 'e78a4e',
      };
    case 'github':
      return {
        bgColor: '293036',
        borderColor: 'ffffff',
        color: 'ffffff',
        lineColor: '9ecbff',
        pointColor: 'f97583',
      };
    case 'rogue':
      return {
        bgColor: '172030',
        borderColor: 'ffffff',
        color: 'a3b09a',
        lineColor: 'b18bb1',
        pointColor: 'c6797e',
      };
    case 'xcode':
      return {
        bgColor: '202124',
        borderColor: 'ffffff',
        color: 'fcfcfa',
        lineColor: 'c4e3ff',
        pointColor: 'ff8070',
      };
    case 'redical':
      return {
        bgColor: '141321',
        borderColor: 'ffffff',
        color: 'a9fef7',
        lineColor: 'fe428e',
        pointColor: 'f8d847',
      };
    case 'coral':
      return {
        bgColor: '9a3838',
        borderColor: 'ffffff',
        color: 'f9fae9',
        lineColor: 'f4e23d',
        pointColor: 'f4e7e7',
      };
    default:
      return {
        bgColor: 'ffcfe9',
        borderColor: 'ffffff',
        color: '9e4c98',
        lineColor: '9e4c98',
        pointColor: '403d3d',
      };
  }
};
