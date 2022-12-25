import { Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import { ParsedQueryOption, ParsedQs, UserDetails } from './interfaces/interface';

export class Utilities {
    public username: string;
    constructor(private readonly queryString: ParsedQs) {
        this.username = String(this.queryString.username);
    }

    public async buildGraph(fetchCalendarData: string | UserDetails, options: ParsedQueryOption) {
        if (typeof fetchCalendarData === 'object') {
            let title = '';

            if (!options.hide_title) {
                if (options.custom_title) {
                    title = options.custom_title;
                } else {
                    title = `${
                        fetchCalendarData.name !== null ? fetchCalendarData.name : options.username
                    }'s Contribution Graph`;
                }
            }

            const graph = new Card(420, 1200, options.radius, options.colors, title, options.area);
            const getChart = await graph.buildGraph(fetchCalendarData.contributions);
            return {
                finalGraph: getChart,
                header: {
                    maxAge: 'public, max-age=1800',
                },
            };
        } else {
            return {
                finalGraph: invalidUserSvg(fetchCalendarData),
                header: { maxAge: 'no-store, max-age=0' },
            };
        }
    }

    public setHttpHeader(res: Response, directivesAndAge: string): void {
        res.setHeader('Cache-Control', `${directivesAndAge}`);
        res.set('Content-Type', 'image/svg+xml');
    }
}
