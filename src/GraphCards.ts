import { createGraph } from './createChart';
import { graphSvg } from './svgs';
import { Colors } from './interfaces/interface';

export class Card {
    constructor(
        private readonly height: number,
        private readonly width: number,
        private readonly colors: Colors,
        private readonly title = '',
        private readonly area = false
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
    }

    /** Unused Code ref #85 */
    private getContrubutionDates() {
        const days = [];
        for (const date = new Date(); days.length < 31; date.setDate(date.getUTCDate() - 1)) {
            const current = new Date(date);
            days.push(
                current.toLocaleString('default', { month: 'short' }) +
                    ' ' +
                    current.getUTCDate().toString()
            );
        }

        return days.reverse();
    }

    async buildGraph(contributions: number[]): Promise<string> {
        //Options to pass in createGraph function
        const options = this.getOptions();

        //Construction of graph from node-chartist
        const line: Promise<string> = await createGraph('line', options, {
            labels: [...Array(contributions.length + 1).keys()].slice(1),
            series: [{ value: contributions }],
        });

        //Arguments to construct graphs with rect and other options
        const args = {
            height: this.height,
            width: this.width,
            colors: this.colors,
            title: this.title,
            line,
        };

        return graphSvg(args);
    }
}
