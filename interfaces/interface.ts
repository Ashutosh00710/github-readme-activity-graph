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

export interface graphArgs {
  height: number;
  width: number;
  colors: colors;
  title: string;
  line: Promise<string>;
}
