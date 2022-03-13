export class Query {
  query: string;
  variables: {
    LOGIN: string;
  };
}

export class colors {
  areaColor: string;
  bgColor: string;
  borderColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
}

export class queryOption {
  username: string;
  hide_title?: boolean;
  custom_title?: string;
  colors: colors;
  area: boolean;
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
}

export class graphArgs {
  height: number;
  width: number;
  colors: colors;
  title: string;
  line: Promise<string>;
}

export class UserDetails {
  contributions: number[];
  name: string;
}

export class ContributionCount {
  contributionCount: number;
}

export class Week {
  contributionDays: Array<ContributionCount>;
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
