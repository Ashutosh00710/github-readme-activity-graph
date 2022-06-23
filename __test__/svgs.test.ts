import { graphSvg, invalidUserSvg } from '../src/svgs';
import { Card } from '../src/GraphCards';
import { fakeGraphArgs, fakeQueryStringRes } from './fakeInputs';

describe('SVG Testing', () => {
    //- Svg testing ✔
    it('Test SVGs', () => {
        let fakeInvalidSvgArg = 'User not found!';
        expect.assertions(4);
        expect(graphSvg(fakeGraphArgs)).toEqual(expect.any(String));
        expect(graphSvg(fakeGraphArgs)).toMatchSnapshot();
        expect(invalidUserSvg(fakeInvalidSvgArg)).toEqual(expect.any(String));
        expect(invalidUserSvg(fakeInvalidSvgArg)).toMatchSnapshot();
    });

    //- Svg testing Promise<string> (GrapgCards.ts)✔
    it('chart SVGs', async () => {
        expect.assertions(1);
        expect(
            await new Card(
                420,
                1200,
                fakeQueryStringRes[0].radius,
                fakeQueryStringRes[0].colors,
                "xyz's Contribution Graph",
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
