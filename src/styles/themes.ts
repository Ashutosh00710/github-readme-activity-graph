import { Colors } from 'src/interfaces/interface';

export const selectColors = (queryString: string): Colors => {
    switch (queryString) {
        case 'github':
            return {
                areaColor: '9ecbff',
                bgColor: '293036',
                borderColor: 'ffffff',
                color: 'ffffff',
                titleColor: 'ffffff',
                lineColor: '9ecbff',
                pointColor: 'f97583',
            };
        case 'github-light':
            return {
                areaColor: '9be9a8',
                bgColor: 'ffffff',
                borderColor: 'ffffff',
                color: '000000',
                titleColor: '000000',
                lineColor: '9be9a8',
                pointColor: '40c463',
            };
        case 'github-compact':
            return {
                areaColor: '26a641',
                bgColor: '00000000',
                borderColor: '8b949e',
                color: '8b949e',
                titleColor: '8b949e',
                lineColor: '26a641',
                pointColor: '8b949e',
            };
        case 'github-dark':
            return {
                areaColor: '1F6FEB',
                bgColor: '0D1117',
                borderColor: 'ffffff',
                color: '58A6FF',
                titleColor: '58A6FF',
                lineColor: '1F6FEB',
                pointColor: '58A6FF',
            };
        case 'github-dark-dimmed':
            return {
                areaColor: 'ADBAC7',
                bgColor: '24292F',
                borderColor: '444c56',
                color: 'ADBAC7',
                titleColor: '539bf5',
                lineColor: 'ADBAC7',
                pointColor: '539bf5',
            };
        case 'dracula':
            return {
                areaColor: 'ff79c6',
                bgColor: '44475a',
                borderColor: 'ffffff',
                color: 'f8f8f2',
                titleColor: 'f8f8f2',
                lineColor: 'ff79c6',
                pointColor: 'bd93f9',
            };
        case 'gruvbox':
            return {
                areaColor: 'd8a657',
                bgColor: '504945',
                borderColor: 'ffffff',
                color: 'd4be98',
                titleColor: 'd4be98',
                lineColor: 'd8a657',
                pointColor: 'e78a4e',
            };
        case 'gotham':
            return {
                areaColor: '2aa889',
                bgColor: '0c1014',
                borderColor: '2aa889',
                color: '2aa889',
                titleColor: '2aa889',
                lineColor: '599cab',
                pointColor: '99d1ce',
            };
        case 'rogue':
            return {
                areaColor: 'b18bb1',
                bgColor: '172030',
                borderColor: 'ffffff',
                color: 'a3b09a',
                titleColor: 'a3b09a',
                lineColor: 'b18bb1',
                pointColor: 'c6797e',
            };
        case 'xcode':
            return {
                areaColor: 'c4e3ff',
                bgColor: '202124',
                borderColor: 'ffffff',
                color: 'fcfcfa',
                titleColor: 'fcfcfa',
                lineColor: 'c4e3ff',
                pointColor: 'ff8070',
            };
        case 'redical':
            return {
                areaColor: 'fe428e',
                bgColor: '141321',
                borderColor: 'ffffff',
                color: 'a9fef7',
                titleColor: 'a9fef7',
                lineColor: 'fe428e',
                pointColor: 'f8d847',
            };
        case 'coral':
            return {
                areaColor: 'f4e23d',
                bgColor: '9a3838',
                borderColor: 'ffffff',
                color: 'f9fae9',
                titleColor: 'f9fae9',
                lineColor: 'f4e23d',
                pointColor: 'f4e7e7',
            };
        case 'react':
            return {
                areaColor: '61dafb',
                bgColor: '282c34',
                borderColor: 'ffffff',
                color: 'ffffff',
                titleColor: 'ffffff',
                lineColor: '61dafb',
                pointColor: '61dafb',
            };
        case 'react-dark':
            return {
                areaColor: '5bcdec',
                bgColor: '0d1117',
                borderColor: 'ffffff',
                color: '5bcdec',
                titleColor: '5bcdec',
                lineColor: '5bcdec',
                pointColor: 'ffffff',
            };
        case 'nord':
            return {
                areaColor: '88c0d0',
                bgColor: '2e3440',
                borderColor: 'ffffff',
                color: '88c0d0',
                titleColor: '88c0d0',
                lineColor: '88c0d0',
                pointColor: 'ffffff',
            };
        case 'lucent':
            return {
                areaColor: 'ffd369',
                bgColor: 'cccccc',
                borderColor: '000000',
                color: '000000',
                titleColor: '000000',
                lineColor: 'ffd369',
                pointColor: 'faf3e0',
            };
        case 'chartreuse-dark':
            return {
                areaColor: '00adfe',
                bgColor: '000000',
                borderColor: '000000',
                color: '7ffe00',
                titleColor: '7ffe00',
                lineColor: '00adfe',
                pointColor: '7ffe00',
            };
        case 'minimal':
            return {
                areaColor: 'd3e6fa',
                bgColor: 'ffffff',
                borderColor: 'ffffff',
                color: '000000',
                titleColor: '000000',
                lineColor: 'd3e6fa',
                pointColor: '3f99ed',
            };
        case 'material-palenight':
            return {
                areaColor: 'c792ea',
                bgColor: '292d3e',
                borderColor: 'ffffff',
                color: 'a6accd',
                titleColor: 'a6accd',
                lineColor: 'c792ea',
                pointColor: '89ddff',
            };
        case 'green':
            return {
                areaColor: '588157',
                borderColor: 'ffffff',
                bgColor: 'dad7cd',
                color: '3a5a40',
                titleColor: '3a5a40',
                lineColor: '588157',
                pointColor: '344e41',
            };
        case 'noctis-minimus':
            return {
                areaColor: '72b7c0',
                borderColor: 'ffffff',
                bgColor: '1b2932',
                color: 'd3b692',
                titleColor: 'd3b692',
                lineColor: '72b7c0',
                pointColor: 'c5cdd3',
            };
        case 'one-dark':
            return {
                areaColor: 'e5c17c',
                borderColor: 'ffffff',
                bgColor: '282C34',
                color: 'abb2bf',
                titleColor: 'abb2bf',
                lineColor: 'e5c17c',
                pointColor: 'e06c75',
            };
        case 'monokai':
            return {
                areaColor: 'ff6188',
                borderColor: 'ffffff',
                bgColor: '2D2A2E',
                color: 'fcfcfa',
                titleColor: 'fcfcfa',
                lineColor: 'ff6188',
                pointColor: 'ffd866',
            };
        case 'elegant':
            return {
                areaColor: '006699',
                borderColor: '161e2d',
                bgColor: '161e2d',
                color: 'd8d5d5',
                titleColor: 'd8d5d5',
                lineColor: 'fb8500',
                pointColor: '42002b',
            };
        case 'aqua':
            return {
                areaColor: '226d64',
                borderColor: '161e2d',
                bgColor: '52b69a',
                color: '187177',
                titleColor: '187177',
                lineColor: '226d64',
                pointColor: '156f69',
            };
        case 'synthwave-84':
            return {
                areaColor: '3A2442',
                borderColor: '251e30',
                bgColor: '2C223B',
                color: 'FF3CA2',
                titleColor: 'FF3CA2',
                lineColor: 'F7F645',
                pointColor: '22E5F4',
            };
        case 'merko':
            return {
                areaColor: 'abd200',
                borderColor: 'ffffff',
                bgColor: '0a0f0b',
                color: 'f6f8fa',
                titleColor: 'f6f8fa',
                lineColor: 'abd200',
                pointColor: 'f6f8fa',
            };
        case 'vue':
            return {
                areaColor: '41b883',
                borderColor: 'ffffff',
                bgColor: '2c3e50',
                color: '41b883',
                titleColor: '41b883',
                lineColor: '41b883',
                pointColor: 'f6f8fa',
            };
        case 'tokyo-day':
            return {
                areaColor: '8f5a02',
                borderColor: 'ffffff',
                bgColor: 'e5e8d8',
                color: '8f5a02',
                titleColor: '8f5a02',
                lineColor: '8f5a02',
                pointColor: '562e49',
            };
        case 'tokyo-night':
            return {
                areaColor: '70a5fd',
                borderColor: 'ffffff',
                bgColor: '1a1b27',
                color: '70a5fd',
                titleColor: '70a5fd',
                lineColor: '70a5fd',
                pointColor: 'a9b1d6',
            };
        case 'high-contrast':
            return {
                areaColor: 'e7e7e7',
                borderColor: 'ffffff',
                bgColor: '000000',
                color: 'e7e7e7',
                titleColor: 'e7e7e7',
                lineColor: 'e7e7e7',
                pointColor: 'e7e7e7',
            };
        case 'cobalt':
            return {
                areaColor: 'd19a66',
                borderColor: 'ffffff',
                bgColor: '193549',
                color: 'd19a66',
                titleColor: 'd19a66',
                lineColor: 'd19a66',
                pointColor: 'e7e7e7',
            };
        case 'material':
            return {
                areaColor: '80cbc4',
                borderColor: 'ffffff',
                bgColor: '263238',
                color: '80cbc4',
                titleColor: '80cbc4',
                lineColor: '80cbc4',
                pointColor: 'ffab91',
            };
        case 'nightowl':
            return {
                areaColor: 'c792ea',
                borderColor: 'ffffff',
                bgColor: '011627',
                color: 'c792ea',
                titleColor: 'c792ea',
                lineColor: 'c792ea',
                pointColor: 'ffeb95',
            };
        case 'modern-lilac':
            return {
                areaColor: '5d417a',
                borderColor: '1c1e26',
                bgColor: '0a0e12',
                color: '5d417a',
                titleColor: '5d417a',
                lineColor: '5d417a',
                pointColor: 'fab795',
            };
        case 'arctic':
            return {
                areaColor: '51E1ED',
                borderColor: 'ffffff',
                bgColor: '03203C',
                color: '5DA3FA',
                titleColor: '5DA3FA',
                lineColor: '5DA3FA',
                pointColor: '2827CC',
            };
        default:
            return {
                areaColor: '9e4c98',
                bgColor: 'ffcfe9',
                borderColor: 'ffffff',
                color: '9e4c98',
                titleColor: '9e4c98',
                lineColor: '9e4c98',
                pointColor: '403d3d',
            };
    }
};
