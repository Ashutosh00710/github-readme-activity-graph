import { createGraph } from './createChart';
import { graphSvg } from './svgs';
import { colors, graphArgs, pcsType } from '../interfaces/interface';

export class Card {
  height: number;
  width: number;
  colors: colors;
  title: string;
  area: boolean;
  pcs: pcsType;
  constructor(
    height: number,
    width: number,
    colors: colors,
    title = '',
    area = false,
    pcs: pcsType
  ) {
    this.height = height;
    this.width = width;
    this.colors = colors;
    this.title = title;
    this.area = area;
    this.pcs = pcs;
  }

  async chart(contributions: number[]): Promise<string> {
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
        title: 'Days',
        offset: 50,
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
      labels: [...Array(contributions.length + 1).keys()].slice(1),
      series: [{ value: contributions }],
    });

    //Arguments to construct graphs with rect and other options
    const args: graphArgs = {
      height: this.height,
      width: this.width,
      colors: this.colors,
      title: this.title,
      line,
      pcs: this.pcs,
    };

    return graphSvg(args);
  }
}
