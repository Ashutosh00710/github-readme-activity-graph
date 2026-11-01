import { Utilities } from '../src/utils';
import { escapeXml } from '../src/svgs';
import { selectColors } from '../src/styles/themes';

const contributions = Array.from({ length: 31 }, (_, i) => ({
    contributionCount: i % 5,
    date: String(i + 1),
}));

describe('SVG injection', () => {
    it('escapes markup in text', () => {
        expect(escapeXml('<script>alert("x")</script> & co')).toEqual(
            '&lt;script&gt;alert("x")&lt;/script&gt; &amp; co',
        );
    });

    it('escapes custom_title in the rendered graph', async () => {
        const utils = new Utilities({
            username: 'octocat',
            custom_title: '<script>alert(1)</script>',
        });
        const { finalGraph } = await utils.buildGraph({ name: 'The Octocat', contributions });
        expect(finalGraph).not.toContain('<script>');
        expect(finalGraph).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    });

    it('escapes the GitHub display name in the default title', async () => {
        const utils = new Utilities({ username: 'octocat' });
        const { finalGraph } = await utils.buildGraph({
            name: '<img src=x onerror=alert(1)>',
            contributions,
        });
        expect(finalGraph).not.toContain('<img');
    });

    it('ignores color values that are not hex codes', () => {
        const injection = 'fff}</style><script>alert(1)</script><style>';
        const { colors } = new Utilities({
            username: 'octocat',
            bg_color: injection,
            color: injection,
            title_color: injection,
            line: 'red;background:url(x)',
            point: '#fff',
            area_color: '',
            border_color: injection,
        }).queryOptions();
        expect(colors).toEqual(selectColors('default'));
    });

    it('keeps valid hex colors', () => {
        const { colors } = new Utilities({
            username: 'octocat',
            bg_color: 'fffff0',
            color: '708090',
            line: '24292E',
            point: 'abc',
            border_color: 'ff000080',
        }).queryOptions();
        expect(colors).toMatchObject({
            bgColor: 'fffff0',
            color: '708090',
            titleColor: '708090',
            lineColor: '24292E',
            pointColor: 'abc',
            borderColor: 'ff000080',
        });
    });
});
