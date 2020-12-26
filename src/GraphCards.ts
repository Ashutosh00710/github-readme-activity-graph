import { createGraph } from "./createChart";
import { graphStyle } from "../styles/graphStyle";
import { strokeAnimation, lineAnimation } from "../styles/graphAnimation";

interface colors {
  bgColor: string;
  color: string;
}

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
      height: this.height - 100,
      axisY: { onlyInteger: true },
    };

    const line = await createGraph("line", options, {
      labels: Array.from(Array(contributions.length).keys()),
      series: [{ value: contributions }],
    });

    return `
      <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
            <rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="80%" stroke="#E4E2E2" width="100%" fill="#${
              this.colors.bgColor
            }" stroke-opacity="1"/>
            <style>
                body {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
                .header {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                  text-align: center;
                  color: #${this.colors.color}
                }

                ${graphStyle(this.colors.color)}
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
