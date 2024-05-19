import moment from 'moment';
import { Response } from 'express';
import { Card } from './GraphCards';
import { invalidUserSvg } from './svgs';
import { selectColors } from './styles/themes';
import { QueryOption, ParsedQs, UserDetails } from './interfaces/interface';

export class Utilities {
    public username: string;
    constructor(private readonly queryString: ParsedQs) {
        this.username = String(this.queryString.username);
    }

    private getColors() {
        const theme = this.queryString.theme || 'default';
        return {
            areaColor: this.queryString.area_color
                ? this.queryString.area_color
                : selectColors(theme).areaColor,
            bgColor: this.queryString.bg_color
                ? this.queryString.bg_color
                : selectColors(theme).bgColor,
            borderColor:
                String(this.queryString.hide_border) === 'true'
                    ? '0000' // transparent
                    : selectColors(theme).borderColor,
            color: this.queryString.color ? this.queryString.color : selectColors(theme).color,
            titleColor: this.queryString.title_color
                ? this.queryString.title_color
                : this.queryString.color
                ? this.queryString.color
                : selectColors(theme).titleColor,
            lineColor: this.queryString.line
                ? this.queryString.line
                : selectColors(theme).lineColor,
            pointColor: this.queryString.point
                ? this.queryString.point
                : selectColors(theme).pointColor,
        };
    }

    private validateDays(days?: string): number {
        const d = Number(days);
        if (typeof d !== 'number') {
            return 31;
        } else if (d > 0 && d <= 90) {
            return d;
        } else {
            return 31;
        }
    }

    private validateDate(date?: string): boolean {
        const format = 'YYYY-MM-DD';
        return moment(date, format, true).isValid();
    }

    private stringDateToUTC(date?: string): string {
        const format = 'YYYY-MM-DD';
        return moment(date, format, true).utc().toISOString();
    }

    private validateFromIsLessThanTwo(from: string, to: string): boolean {
        // Parse the ISO string dates into Moment objects
        const fromDate = moment(from);
        const toDate = moment(to);
        const now = moment();
        // Compare the dates using the isBefore method
        return (
            fromDate.isBefore(toDate) &&
            moment(fromDate).isSameOrBefore(now) &&
            moment(toDate).isSameOrBefore(now)
        );
    }

    private calculateNumberOfDaysFromDate(from: string, to: string): number {
        // Parse the ISO string dates into Moment objects
        const fromDate = moment(from);
        const toDate = moment(to);

        // Compare the dates using the isBefore method
        return toDate.diff(fromDate, 'days');
    }

    public queryOptions() {
        let area = false;
        if (String(this.queryString.area) === 'true') {
            area = true;
        }

        // Custom options for user
        const colors = this.getColors();
        let from = '',
            to = '',
            days = 31;
        const isFromValid = this.validateDate(this.queryString.from);
        const isToValid = this.validateDate(this.queryString.to);
        if (isFromValid && isToValid) {
            from = this.stringDateToUTC(this.queryString.from);
            to = this.stringDateToUTC(this.queryString.to);
            if (!this.validateFromIsLessThanTwo(from, to)) {
                from = '';
                to = '';
                days = 31;
            } else {
                days = this.calculateNumberOfDaysFromDate(from, to);
            }
        }

        const options: QueryOption = {
            username: this.username,
            hide_title: String(this.queryString.hide_title) === 'true',
            radius: this.queryString.radius
                ? Math.min(Math.max(this.queryString.radius, 0), 16)
                : 0, // Border radius in range [0, 16]
            colors: colors,
            area: area,
            height: this.queryString.height
                ? Math.min(Math.max(this.queryString.height, 200), 600)
                : 420, // Custom height implementation from range [200, 600], if not specified use default value - 420
            days: isFromValid && isToValid ? days : this.validateDays(this.queryString.days),
            grid: this.queryString.grid === 'false' ? false : true,
            from,
            to,
        };

        if (this.queryString.custom_title)
            options['custom_title'] = String(this.queryString.custom_title);

        return options;
    }

    public async buildGraph(fetchCalendarData: string | UserDetails) {
        if (typeof fetchCalendarData === 'object') {
            const options = this.queryOptions();
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

            const graph = new Card(
                options.height,
                1200,
                options.radius,
                options.colors,
                title,
                options.area,
                options.grid
            );
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
