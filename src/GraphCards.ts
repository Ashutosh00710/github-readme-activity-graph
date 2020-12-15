const generate = require("node-chartist");

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
    };

    const line = await generate("line", options, {
      labels: Array.from(Array(contributions.length).keys()),
      series: [{ value: contributions }],
    });
    return `
      <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >   
            <rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="95%" stroke="#E4E2E2" width="100%" fill="#e2f3f5" stroke-opacity="1"/>
            <style>
                body {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                }
                .header {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                  text-align: center
                }
            </style>
              <foreignObject width=${this.width} height=${this.height}>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"/>
                <h2 class="header">${this.title}</h2>
                ${line}
              </foreignObject>
        </svg>
    `;
  }
}
