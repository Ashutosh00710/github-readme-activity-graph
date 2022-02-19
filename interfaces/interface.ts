export interface query {
  query: string;
  variables: {
    LOGIN: string;
  };
}

export interface colors {
  areaColor: string;
  bgColor: string;
  borderColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
}

export interface pcsType {
  light?: colors;
  dark?: colors;
}

export interface queryOption {
  username: string;
  hide_title?: boolean;
  custom_title?: string;
  colors: colors;
  area: boolean;
  pcs: pcsType;
}

export interface ParsedQsPCS {
  area_color?: string;
  bg_color?: string;
  hide_border?: boolean;
  color?: string;
  line?: string;
  point?: string;
}

export interface ParsedQs {
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
  pcs_light?: ParsedQsPCS;
  pcs_dark?: ParsedQsPCS;
}

export interface graphArgs {
  height: number;
  width: number;
  colors: colors;
  title: string;
  line: Promise<string>;
  pcs: pcsType;
}

export interface userDetails {
  contributions: number[];
  name: string;
}

export interface contributionCount {
  contributionCount: number;
}

export interface week {
  contributionDays: contributionCount[];
}

export interface responseOfApi {
  data: {
    user: {
      name: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: week[];
        };
      };
    };
  };
}
