import { createGraph } from './createChart';
import { graphSvg } from './svgs';
import { Colors, ContributionDay } from './interfaces/interface';

export class Card {
    constructor(
        private readonly height: number,
        private readonly width: number,
        private readonly radius: number,
        private readonly colors: Colors,
        private readonly browser: string,
        private readonly title = '',
        private readonly area = false,
        private readonly showGrid = true
    ) {}

    private getOptions() {
        return {
            width: this.width,
            height: this.height,
            axisY: {
                title: 'Contributions',
                onlyInteger: true,
                offset: 70,
                labelOffset: {
                    y: 4.5,
                },
                low: 0,
                showGrid: this.showGrid,
            },
            axisX: {
                title: 'Days',
                offset: 50,
                labelOffset: {
                    x: -4.5,
                },
                showGrid: this.showGrid,
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
    }

    async buildGraph(days: ContributionDay[]): Promise<string> {
        //Options to pass in createGraph function
        const options = this.getOptions();

        //Construction of graph from node-chartist
        const line: Promise<string> = await createGraph('line', options, {
            labels: days.map((day) => day.date),
            series: [{ value: days.map((day) => day.contributionCount) }],
        });

        //Arguments to construct graphs with rect and other options
        const args = {
            height: this.height,
            width: this.width,
            colors: this.colors,
            title: this.title,
            radius: this.radius,
            browser: this.browser,
            line,
        };

        return graphSvg(args);
    }
}
