
import { createGraph } from "./createChart";
const { graphStyle } = require("./graphStyle");
import {strokeAnimation, lineAnimation} from "./graphAnimation";
interface colors {
  bgColor: string; //for background
  color: string; //for font
}

export class Card {
  //class data members
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

  //member function

  async chart(contributions: number[]): Promise<string> {
    /*           For bar graph
    const options = { width: this.width, height: this.height -100 };
    const data = {
      labels: Array.from(Array(contributions.length).keys()),
      series: [contributions],
    };
    const bar = await generate("bar", options, data);
    */
    const options = {
      width: this.width,
      height: this.height - 100,
      axisY: {onlyInteger: true}
    };

    const line = await createGraph("line", options, {
      labels: Array.from(Array(contributions.length).keys()),
      series: [{ value: contributions }],
    });
    //
    return `
      <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
            <rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="80%" stroke="#E4E2E2" width="100%" fill="#e2f3f5" stroke-opacity="1"/>
            <style>
                body {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
                .header {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                  text-align: center
                }

                ${graphStyle()}
                ${strokeAnimation()}
                ${lineAnimation()}

            </style>

            <foreignObject x="20" y="20" width="${this.width}" height="50">
              <h1 xmlns="http://www.w3.org/1999/xhtml" class="header">${
                this.title
              }</h1>
            </foreignObject>

            ${line}
        </svg>
    `;
  }
}
