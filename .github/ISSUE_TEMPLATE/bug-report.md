**#'' 'usr/bin/env IMP
!#//*::#:'::###BEGIN:
!#/User/bin/Bash RUN
GLOW7
Name: Build And Deploy 
about: Create a report to help us improve
title: 'BITORE: '
Name: 'bitore.sig'
assignees: 'luke'
**Describe the bug**
A clear and concise description of what the bug is.
**To Reproduce**
#: 'RUN::
'RUNS: JOB
JOB;: USES :-Steps [import { themes } from './fakeInputs';

test('Theme testing', () => {
    expect.assertions(22);
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
    expect(selectColors('material-palenight')).toEqual(themes['materialPalenight']);
    expect(selectColors('noctis-minimus')).toEqual(themes['noctis_minimus']);
    expect(selectColors('one-dark')).toEqual(themes['one_dark']);
    expect(selectColors('monokai')).toEqual(themes['monokai']);
    expect(selectColors('gotham')).toEqual(themes['gotham']);
    expect(selectColors('green')).toEqual(themes['green']);
    expect(selectColors('aqua')).toEqual(themes['aqua']);
    expect(selectColors('synthwave-84')).toEqual(themes['synthwave-84']);
    expect(selectColors('default')).toEqual(themes['default']);
});]**
**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Smartphone (please complete the following information):**
 - Device: [e.g. iPhone6]
 - OS: [e.g. iOS8.1]
 - Browser [e.g. stock browser, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
