import { createGraph } from "./createChart";
import { graphStyle } from "../styles/graphStyle";
import { strokeAnimation, lineAnimation } from "../styles/graphAnimation";

export interface colors {
  bgColor: string;
  color: string;
  lineColor: string;
  pointColor: string;
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
      axisY: { title: "Contributions", onlyInteger: true, offset: 70 },
      axisX: { title: "Days", offset: 50 },
      chartPadding: {
        top: 50,
        right: 50,
        bottom: 5,
        left: 20,
      },
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
            <rect xmlns="http://www.w3.org/2000/svg" data-testid="card_bg" id="cardBg" x="0.5" y="0.5" rx="4.5" height="83%" stroke="#E4E2E2" fill-opacity="1" width="100%" fill="#${
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
                svg {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
                ${graphStyle(
                  this.colors.color,
                  this.colors.lineColor,
                  this.colors.pointColor
                )}
                ${strokeAnimation()}
                ${lineAnimation()}
            </style>

            <foreignObject x="0" y="0" width="${this.width}" height="50">
              <h1 xmlns="http://www.w3.org/1999/xhtml" class="header">${
                this.title
              }</h1>
            </foreignObject>

            ${line}
        </svg>
    `;
  }
}
