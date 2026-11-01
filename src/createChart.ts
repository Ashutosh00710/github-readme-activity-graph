import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

// Renders Chartist charts on the server. This replaces node-chartist, which is
// unmaintained and pulled in jsdom 9, request and is_js (CVE-2020-26302). It
// does the same steps: load Chartist into a jsdom window, render the chart,
// add the axis titles and return the SVG markup.

const chartistSource = readFileSync(require.resolve('chartist/dist/chartist.js'), 'utf8');

/* eslint-disable @typescript-eslint/no-explicit-any */
type Chartist = any;
type Chart = any;

const createChartist = () => {
    const { window } = new JSDOM('', { runScripts: 'outside-only' });
    // Chartist calls matchMedia for responsive options, which jsdom lacks.
    Object.assign(window, {
        matchMedia: () => ({ matches: false, addListener() {}, removeListener() {} }),
        // Chartist checks `instanceof Array` inside the window's context, so
        // arrays created in Node must pass that check.
        Array,
    });
    window.eval(chartistSource);
    const Chartist = (window as any).Chartist;
    // Disable foreignObject labels and animations, as node-chartist did.
    const isSupported = Chartist.Svg.isSupported;
    Chartist.Svg.isSupported = (feature: string) =>
        ['Extensibility', 'AnimationEventsAttribute'].includes(feature)
            ? false
            : isSupported(feature);
    return { window, Chartist };
};

const textAnchor = 'middle';
const titleClass = 'ct-axis-title ct-label';

const axisXTitle = (chart: Chart) => {
    const { chartPadding, axisX, axisY } = chart.options;
    const x =
        chartPadding.left +
        (axisY.position === 'start' ? axisY.offset : 0) +
        chart.axisX.axisLength / 2;
    const y =
        chartPadding.top + (axisX.position === 'start' ? 0 : chart.axisY.axisLength + axisX.offset);
    const dominantBaseline = axisX.position === 'start' ? 'hanging' : 'text-after-edge';
    return {
        text: axisX.title,
        attr: { x, y, 'dominant-baseline': dominantBaseline, 'text-anchor': textAnchor },
    };
};

const axisYTitle = (chart: Chart) => {
    const { chartPadding, axisX, axisY } = chart.options;
    const x =
        chartPadding.left +
        (axisY.position === 'start' ? 0 : chart.axisX.axisLength + axisY.offset);
    const y =
        chartPadding.top +
        (axisX.position === 'start' ? axisX.offset : 0) +
        chart.axisY.axisLength / 2;
    const rotation = axisY.position === 'start' ? -90 : 90;
    const transform = `rotate(${rotation}, ${x}, ${y})`;
    const dominantBaseline = axisY.position === 'start' ? 'hanging' : 'text-after-edge';
    return {
        text: axisY.title,
        attr: { x, y, transform, 'dominant-baseline': dominantBaseline, 'text-anchor': textAnchor },
    };
};

const renderAxisTitles = (Chartist: Chartist, chart: Chart) => {
    const titles = [
        chart.axisX && chart.options.axisX.title ? axisXTitle(chart) : null,
        chart.axisY && chart.options.axisY.title ? axisYTitle(chart) : null,
    ];
    for (const title of titles) {
        if (!title) continue;
        const text = new Chartist.Svg('text');
        text.addClass(titleClass);
        text.attr(title.attr);
        text.text(title.text);
        chart.svg.append(text);
    }
};

/**
 * Generate Chart HTML
 *
 * @param {String} type
 *        bar, line, pie
 * @param {Object} options
 *        Chartist options + axis*.title
 * @param {Object} data
 *        Chartist data object
 *
 * @return {Promise{String}} svg
 */
export const createGraph = async (type: string, options: any, data: any): Promise<string> => {
    const { window, Chartist } = createChartist();
    const chartType = type.charAt(0).toUpperCase() + type.slice(1);
    if (!Chartist[chartType]) throw new TypeError(`Unsupported chart type: ${chartType}`);

    const container = window.document.createElement('div');
    const chart = new Chartist[chartType](container, data, options);
    const event: Chart = await new Promise((resolve) => chart.on('created', resolve));
    chart.axisX = event.axisX;
    chart.axisY = event.axisY;
    renderAxisTitles(Chartist, chart);
    chart.detach();
    const svg = container.innerHTML;
    window.close();
    return svg;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
