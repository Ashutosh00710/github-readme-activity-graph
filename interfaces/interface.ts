export interface colors {
  bgColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
}

export interface theme<T> {
  [key: string]: T;
}
