import { promises } from "dns";

export interface colors {
  bgColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
}

export interface theme<T> {
  [key: string]: T;
}

export interface graphArgs {
  height: number;
  width: number;
  colors: colors;
  title: string;
  line: Promise<string>;
} 
