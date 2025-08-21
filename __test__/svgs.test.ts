import { graphSvg, invalidUserSvg } from '../src/svgs';
import { Card } from '../src/GraphCards';
import {
    fakeGraphArgsForBrowsersOtherThanSafari,
    fakeGraphArgsForSafari,
    fakeQueryStringRes,
} from './fakeInputs';

describe('SVG Testing', () => {
    //- Svg testing ✔
    it('Test SVGs', () => {
        let fakeInvalidSvgArg = 'User not found!';
        expect.assertions(6);
        expect(graphSvg(fakeGraphArgsForBrowsersOtherThanSafari)).toEqual(expect.any(String));
        expect(graphSvg(fakeGraphArgsForBrowsersOtherThanSafari)).toMatchSnapshot();
        expect(graphSvg(fakeGraphArgsForSafari)).toEqual(expect.any(String));
        expect(graphSvg(fakeGraphArgsForSafari)).toMatchSnapshot();
        expect(invalidUserSvg(fakeInvalidSvgArg)).toEqual(expect.any(String));
        expect(invalidUserSvg(fakeInvalidSvgArg)).toMatchSnapshot();
    });

    //- Svg testing Promise<string> (GrapgCards.ts)✔
    it('chart SVGs for browsers other than Safari', async () => {
        expect.assertions(1);
        expect(
            await new Card(
                420,
                1200,
                fakeQueryStringRes[0].radius,
                fakeQueryStringRes[0].colors,
                "xyz's Contribution Graph",
                'Chrome',
                fakeQueryStringRes[0].area
            ).buildGraph([
                {
                    contributionCount: 2,
                    date: '1',
                },
                {
                    contributionCount: 3,
                    date: '2',
                },
                {
                    contributionCount: 10,
                    date: '1',
                },
                {
                    contributionCount: 12,
                    date: '1',
                },
                {
                    contributionCount: 14,
                    date: '1',
                },
            ])
        ).toMatchSnapshot();
    });
    it('chart SVGs for Safari browser', async () => {
        expect.assertions(1);
        expect(
            await new Card(
                420,
                1200,
                fakeQueryStringRes[0].radius,
                fakeQueryStringRes[0].colors,
                "xyz's Contribution Graph",
                'Safari',
                fakeQueryStringRes[0].area
            ).buildGraph([
                {
                    contributionCount: 2,
                    date: '1',
                },
                {
                    contributionCount: 3,
                    date: '2',
                },
                {
                    contributionCount: 10,
                    date: '1',
                },
                {
                    contributionCount: 12,
                    date: '1',
                },
                {
                    contributionCount: 14,
                    date: '1',
                },
            ])
        ).toMatchSnapshot();
    });
});
