import moment from 'moment';
import { Utilities } from '../src/utils';

describe('Utilities queryOptions edge cases', () => {
    it('uses a valid from/to range to derive days and UTC bounds', () => {
        const utils = new Utilities({ username: 'user', from: '2024-01-01', to: '2024-01-10' });
        const options = utils.queryOptions();
        const toUTC = (d: string) => moment(d, 'YYYY-MM-DD', true).utc().toISOString();
        expect(options.from).toBe(toUTC('2024-01-01'));
        expect(options.to).toBe(toUTC('2024-01-10'));
        expect(options.days).toBe(9);
    });

    it('falls back to 31 days when from is after to', () => {
        const utils = new Utilities({ username: 'user', from: '2024-01-10', to: '2024-01-01' });
        const options = utils.queryOptions();
        expect(options.from).toBe('');
        expect(options.to).toBe('');
        expect(options.days).toBe(31);
    });

    it('falls back to 31 days when the range is in the future', () => {
        const utils = new Utilities({ username: 'user', from: '2999-01-01', to: '2999-01-10' });
        const options = utils.queryOptions();
        expect(options.from).toBe('');
        expect(options.to).toBe('');
        expect(options.days).toBe(31);
    });

    it('falls back to the days parameter when only one of from/to is valid', () => {
        const utils = new Utilities({ username: 'user', from: '2024-01-01', days: '15' });
        expect(utils.queryOptions().days).toBe(15);
    });

    it('validates the days parameter', () => {
        expect(new Utilities({ username: 'user', days: '45' }).queryOptions().days).toBe(45);
        expect(new Utilities({ username: 'user', days: '100' }).queryOptions().days).toBe(31);
        expect(new Utilities({ username: 'user', days: 'abc' }).queryOptions().days).toBe(31);
        expect(new Utilities({ username: 'user' }).queryOptions().days).toBe(31);
    });

    it('clamps radius to [0, 16] and height to [200, 600]', () => {
        const clamped = new Utilities({
            username: 'user',
            radius: 20,
            height: 1000,
        }).queryOptions();
        expect(clamped.radius).toBe(16);
        expect(clamped.height).toBe(600);
        const clampedLow = new Utilities({
            username: 'user',
            radius: -5,
            height: 100,
        }).queryOptions();
        expect(clampedLow.radius).toBe(0);
        expect(clampedLow.height).toBe(200);
        const defaults = new Utilities({ username: 'user' }).queryOptions();
        expect(defaults.radius).toBe(0);
        expect(defaults.height).toBe(420);
    });

    it('parses area, grid, and hide_title flags', () => {
        const options = new Utilities({
            username: 'user',
            area: true,
            grid: 'false',
            hide_title: true,
        }).queryOptions();
        expect(options.area).toBe(true);
        expect(options.grid).toBe(false);
        expect(options.hide_title).toBe(true);
        expect(new Utilities({ username: 'user' }).queryOptions().area).toBe(false);
        expect(new Utilities({ username: 'user' }).queryOptions().grid).toBe(true);
    });

    it('uses a transparent border color when hide_border is true', () => {
        const options = new Utilities({ username: 'user', hide_border: true }).queryOptions();
        expect(options.colors.borderColor).toBe('0000');
    });

    it('prefers custom query colors and falls back to the base color for the title', () => {
        const options = new Utilities({ username: 'user', color: 'ff0000' }).queryOptions();
        expect(options.colors.color).toBe('ff0000');
        expect(options.colors.titleColor).toBe('ff0000');
        const explicit = new Utilities({
            username: 'user',
            color: 'ff0000',
            title_color: '00ff00',
        }).queryOptions();
        expect(explicit.colors.titleColor).toBe('00ff00');
    });

    it('sets custom_title only when provided', () => {
        expect(new Utilities({ username: 'user' }).queryOptions().custom_title).toBeUndefined();
        expect(
            new Utilities({ username: 'user', custom_title: 'My Graph' }).queryOptions()
                .custom_title,
        ).toBe('My Graph');
    });
});
