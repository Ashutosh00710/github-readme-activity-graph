import moment, { Moment } from 'moment';
import { selectColors } from '../styles/themes';

export class Query {
    query: string;
    variables: {
        LOGIN: string;
    };
}

export class GraphColorAttributes {
    areaColor: string;
    bgColor: string;
    borderColor: string;
    color: string;
    titleColor: string;
    lineColor: string;
    pointColor: string;

    constructor(queryString: ParsedQs) {
        const theme = queryString.theme || 'default';
        this.areaColor = queryString.area_color || selectColors(theme).areaColor;
        this.bgColor = queryString.bg_color || selectColors(theme).bgColor;
        this.borderColor =
            String(queryString.hide_border) === 'true'
                ? '0000' // transparent
                : selectColors(theme).borderColor;
        this.color = queryString.color || selectColors(theme).color;
        this.titleColor = queryString.title_color || selectColors(theme).titleColor;
        this.lineColor = queryString.line || selectColors(theme).lineColor;
        this.pointColor = queryString.point || selectColors(theme).pointColor;
    }
}

export class ParsedQueryOption {
    username: string;
    hide_title: boolean;
    custom_title?: string;
    from?: Moment;
    to?: Moment;
    colors: GraphColorAttributes;
    area: boolean;
    radius: number;

    constructor(queryString: ParsedQs, username: string) {
        this.username = username;
        this.area = false;
        if (String(queryString.area) === 'true') {
            this.area = true;
        }
        // Custom options for user
        this.colors = new GraphColorAttributes(queryString);
        this.hide_title = String(queryString.hide_title) === 'true';
        this.radius = queryString.radius ? Math.min(Math.max(queryString.radius, 0), 16) : 0; // Border radius in range [0, 16]
        this.custom_title = undefined;
        if (queryString.custom_title) this.custom_title = String(queryString.custom_title);
        if (queryString.from && moment(queryString.from, 'YYYY-MM-DD', true).isValid()) {
            const date = moment(queryString.from).hour(0).minutes(0).seconds(0).milliseconds(0);
            this.from = date.utc();
        } else {
            this.from = undefined;
        }
        if (queryString.to && moment(queryString.to, 'YYYY-MM-DD', true).isValid()) {
            const date = moment(queryString.to).hour(0).minutes(0).seconds(0).milliseconds(0);
            this.to = date.utc();
        } else {
            this.to = undefined;
        }
    }

    checkAllValidationsForDateRange(): [boolean, number] {
        if (!this.from || !this.to) return [false, 0];
        const diff = this.to?.diff(this.from, 'days');
        if (diff && diff >= 5) {
            const toDiff = this.to?.diff(moment(), 'days');
            const fromDiff = this.from?.diff(moment(), 'days');
            if ((toDiff && toDiff > 0) || (fromDiff && fromDiff > 0)) {
                return [false, 0];
            } else {
                return [true, diff];
            }
        } else {
            return [false, 0];
        }
    }
}

export class ParsedQs {
    username?: string;
    hide_title?: boolean;
    custom_title?: string;
    bg_color?: string;
    hide_border?: boolean;
    area_color?: string;
    color?: string;
    line?: string;
    point?: string;
    theme?: string;
    area?: boolean;
    radius?: number;
    title_color?: string;
    from?: string;
    to?: string;
}

export class GraphArgs {
    height: number;
    width: number;
    colors: GraphColorAttributes;
    title: string;
    radius: number;
    line: Promise<string>;
}

export class UserDetails {
    contributions: Array<ContributionDay>;
    name: string;
}

export class ContributionDay {
    contributionCount: number;
    date: string;
}

export class Week {
    contributionDays: Array<ContributionDay>;
}

export class ResponseOfApi {
    data: {
        user: {
            name: string;
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: Array<Week>;
                };
            };
        };
    };
}
