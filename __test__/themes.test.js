const { selectColors } = require('../styles/themes');
const { themes } = require('./fakeInputs');

it('Theme testing', () => {
  expect(selectColors('dracula')).toEqual(themes['dracula']);
  expect(selectColors('gruvbox')).toEqual(themes['gruvbox']);
  expect(selectColors('github')).toEqual(themes['github']);
  expect(selectColors('rogue')).toEqual(themes['rogue']);
  expect(selectColors('redical')).toEqual(themes['redical']);
  expect(selectColors('xcode')).toEqual(themes['xcode']);
  expect(selectColors('coral')).toEqual(themes['coral']);
  expect(selectColors('default')).toEqual(themes['default']);
});
