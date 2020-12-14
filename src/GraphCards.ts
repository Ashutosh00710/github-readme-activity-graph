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
  render(/*body: string*/): string {
    return `
        <svg
          width="${this.width}"
          height="${this.height}"
          viewBox="0 0 ${this.width} ${this.height}"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <style>
                .header {
                  font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
                  fill: ${this.colors};
                  animation: fadeInAnimation 0.8s ease-in-out forwards;
                }
            </style>
            <rect
              data-testid="card-bg"
              x="0.5"
              y="0.5"
              rx="4.5"
              height="99%"
              stroke="#E4E2E2"
              width="${this.width}"
              fill="${this.colors}"
            />
        </svg>
    `;
  }

  async chart(contributions: number[]) {
    /*           For bar graph
    const options = { width: this.width, height: this.height };
    const data = {
      labels: Array.from(Array(contributions.length).keys()),
      series: [contributions],
    };
    const bar = await generate("bar", options, data);
    */
    const options = {
      width: this.width,
      height: this.height,
      axisX: { title: "Days" },
      axisY: { title: "Contributions" },
    };

    const line = await generate("line", options, {
      labels: Array.from(Array(contributions.length).keys()),
      series: [{ value: contributions }],
    });
    return `
      <div>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"/>
        <h2>${this.title}</h2>
        ${line}
      </div>
    `;
  }
}
