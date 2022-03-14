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
                fakeQueryStringRes[0].colors,
                "xyz's Contribution Graph",
                fakeQueryStringRes[0].area
            ).buildGraph([1, 2, 3, 4, 5])
        ).toMatchSnapshot();
    });
});
