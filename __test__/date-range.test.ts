import { Utilities } from '../src/utils';

describe('date-only range query options', () => {
    it('maps calendar dates to UTC midnight regardless of the host timezone', () => {
        const options = new Utilities({
            username: 'synthetic-user',
            from: '2026-09-01',
            to: '2026-10-02',
        }).queryOptions();

        expect(options.from).toBe('2026-09-01T00:00:00.000Z');
        expect(options.to).toBe('2026-10-02T00:00:00.000Z');
        expect(options.days).toBe(31);
    });
});
