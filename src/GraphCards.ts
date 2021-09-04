import { createGraph } from './createChart';
import { graphSvg } from './svgs';
import { colors, graphArgs } from '../interfaces/interface';

export class Card {
  height: number;
  width: number;
  colors: colors;
  title: string;
  area: boolean;
  constructor(
    height: number,
    width: number,
    colors: colors,
    title = '',
    area = false
  ) {
    this.height = height;
    this.width = width;
    this.colors = colors;
    this.title = title;
    this.area = area;
  }

  async chart(
    contributions: number[],
    contributions_dates: string[]
  ): Promise<string> {
    //Options to pass in createGraph function
    const options = {
      width: this.width,
      height: this.height,
      axisY: {
        title: 'Contributions',
        onlyInteger: true,
        offset: 70,
        labelOffset: {
          y: 4.5,
        },
      },
      axisX: {
        title: 'Dates',
        offset: 70,
        labelOffset: {
          x: -4.5,
        },
      },
      chartPadding: {
        top: 80,
        right: 50,
        bottom: 20,
        left: 20,
      },
      showArea: this.area,
      fullWidth: true,
    };

    //Construction of graph from node-chartist
    const line: Promise<string> = await createGraph('line', options, {
      labels: contributions_dates,
      series: [{ value: contributions }],
    });

    //Arguments to construct graphs with rect and other options
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
