import { selectColors } from '../styles/themes';
import { themes } from './fakeInputs';

it('Theme testing', () => {
  expect.assertions(14);
  expect(selectColors('dracula')).toEqual(themes['dracula']);
  expect(selectColors('gruvbox')).toEqual(themes['gruvbox']);
  expect(selectColors('github')).toEqual(themes['github']);
  expect(selectColors('rogue')).toEqual(themes['rogue']);
  expect(selectColors('redical')).toEqual(themes['redical']);
  expect(selectColors('xcode')).toEqual(themes['xcode']);
  expect(selectColors('coral')).toEqual(themes['coral']);
  expect(selectColors('react-dark')).toEqual(themes['reactDark']);
  expect(selectColors('nord')).toEqual(themes['nord']);
  expect(selectColors('lucent')).toEqual(themes['lucent']);
  expect(selectColors('chartreuse-dark')).toEqual(themes['chartreuseDark']);
  expect(selectColors('github-light')).toEqual(themes['githubLight']);
  expect(selectColors('minimal')).toEqual(themes['minimal']);
  expect(selectColors('default')).toEqual(themes['default']);
});
