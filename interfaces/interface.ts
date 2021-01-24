export interface contributionData {
  contributionDays: dailyContribution[];
}

export interface dailyContribution {
  contributionCount: number;
}

export interface query {
  query: string;
  variables: {
    LOGIN: string;
  };
}

export interface colors {
  bgColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
}

export interface queryOption {
  username: string;
  colors: colors;
  area: boolean;
}

export interface ParsedQs {
  username?: string;
  bg_color?: string;
  color?: string;
  line?: string;
  point?: string;
  theme?: string;
  area?: boolean;
}

export interface graphArgs {
  height: number;
  width: number;
  colors: colors;
  title: string;
  line: Promise<string>;
}

export interface userDetails {
  contributions: number[];
  name: string;
}
