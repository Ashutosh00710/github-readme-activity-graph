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
    const options = { width: this.width, height: this.height };
    const data = {
      labels: Array.from(Array(contributions.length).keys()),
      series: [contributions],
    };
    const bar = await generate("bar", options, data);
    */
    const options = {
      width: "800",
      height: "400",
      axisX: { title: "Days" },
      axisY: { title: "Contributions" },
    };

    const line = await generate("line", options, {
      labels: Array.from(Array(contributions.length).keys()),
      series: [{ value: contributions }],
    });
    return `
      <svg
          width="1000"
          height="500"
          viewBox="0 0 ${this.width} ${this.height}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                .header {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                  text-align: center
                }
            </style>
              <foreignObject width="800" height="500">
                <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"/>
                <h2 class="header">${this.title}</h2>
                ${line}
              </foreignObject>
        </svg>
    `;
  }
}
