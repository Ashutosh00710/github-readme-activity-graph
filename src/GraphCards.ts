import { createGraph } from "./createChart";
import { colors, graphArgs } from "../interfaces/interface";
import { graphSvg } from "./svgs";

export class Card {
  height: number;
  width: number;
  colors: colors;
  title: string;
  constructor(
    height: number,
    width: number,
    colors: colors,
    title: string = ""
  ) {
    this.height = height;
    this.width = width;
    this.colors = colors;
    this.title = title;
  }

  async chart(contributions: number[]): Promise<string> {
    const options = {
      width: this.width,
      height: this.height,
      axisY: { title: "Contributions", onlyInteger: true, offset: 70 },
      axisX: { title: "Days", offset: 50, showGrid: false },
      chartPadding: {
        top: 50,
        right: 50,
        bottom: 10,
        left: 20,
      },
    };

    const line: Promise<string> = await createGraph("line", options, {
      labels: Array.from(Array(contributions.length).keys(), (day) => day + 1),
      series: [{ value: contributions }],
    });

    const args: graphArgs = {
      height: this.height,
      width: this.width,
      colors: this.colors,
      title: this.title,
      line,
    };

    return graphSvg(args);
  }
}
