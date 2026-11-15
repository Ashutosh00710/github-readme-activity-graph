// Plain-SVG line chart renderer.
// This replaces node-chartist, which spun up a jsdom browser window and
// re-evaluated the whole Chartist library on every request. The layout math
// (axis scaling, monotone cubic smoothing, label placement) follows
// Chartist 0.11 so the generated markup — and the `ct-*` classes that
// styles/graphStyle.ts targets — stay the same.

export interface ChartOptions {
    width: number;
    height: number;
    axisX: {
        title: string;
        offset: number;
        labelOffset: { x: number; y: number };
        showGrid: boolean;
    };
    axisY: {
        title: string;
        offset: number;
        labelOffset: { x: number; y: number };
        showGrid: boolean;
        low: number;
        onlyInteger: boolean;
        scaleMinSpace: number;
    };
    chartPadding: { top: number; right: number; bottom: number; left: number };
    showArea: boolean;
}

interface Bounds {
    min: number;
    max: number;
    range: number;
    values: number[];
}

interface Point {
    x: number;
    y: number;
}

type PathElement =
    | { command: 'M' | 'L'; x: number; y: number }
    | { command: 'C'; x1: number; y1: number; x2: number; y2: number; x: number; y: number };

const PRECISION = 8; // Chartist.precision
const PATH_ACCURACY = 3; // decimals kept in path `d` attributes
const EPSILON = 2.221e-16;

const escapeText = (text: string): string =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const roundTo = (value: number, digits: number): number => {
    const factor = Math.pow(10, digits);
    return Math.round(value * factor) / factor;
};

// Smallest factor of an integer (Pollard's rho), used to pick integer step sizes.
const smallestFactor = (num: number): number => {
    if (num === 1) return num;
    if (num % 2 === 0) return 2;
    const gcd = (p: number, q: number): number => (p % q === 0 ? q : gcd(q, p % q));
    const f = (x: number) => x * x + 1;
    let x1 = 2,
        x2 = 2,
        divisor: number;
    do {
        x1 = f(x1) % num;
        x2 = f(f(x2)) % num;
        divisor = gcd(Math.abs(x1 - x2), num);
    } while (divisor === 1);
    return divisor;
};

// Pick a "nice" value scale and tick values for the Y axis.
const getBounds = (
    axisLength: number,
    high: number,
    low: number,
    scaleMinSpace: number,
    onlyInteger: boolean,
): Bounds => {
    const project = (length: number, range: number) => (length / range) * axisLength;

    const oom = Math.floor(Math.log(Math.abs(high - low)) / Math.LN10);
    let step = Math.pow(10, oom);
    let min = Math.floor(low / step) * step;
    let max = Math.ceil(high / step) * step;
    const range = max - min;

    const scaleUp = project(step, range) < scaleMinSpace;
    const factor = onlyInteger ? smallestFactor(range) : 0;

    if (onlyInteger && project(1, range) >= scaleMinSpace) {
        step = 1;
    } else if (onlyInteger && factor < step && project(factor, range) >= scaleMinSpace) {
        step = factor;
    } else {
        for (let i = 0; ; i++) {
            if (scaleUp && project(step, range) <= scaleMinSpace) {
                step *= 2;
            } else if (!scaleUp && project(step / 2, range) >= scaleMinSpace) {
                step /= 2;
                if (onlyInteger && step % 1 !== 0) {
                    step *= 2;
                    break;
                }
            } else {
                break;
            }
            if (i > 1000) {
                throw new Error(
                    'Exceeded maximum number of iterations while optimizing scale step!',
                );
            }
        }
    }

    step = Math.max(step, EPSILON);
    const safeIncrement = (value: number, increment: number) => {
        if (value === (value += increment)) {
            value *= 1 + (increment > 0 ? EPSILON : -EPSILON);
        }
        return value;
    };

    while (min + step <= low) min = safeIncrement(min, step);
    while (max - step >= high) max = safeIncrement(max, -step);

    const values: number[] = [];
    for (let i = min; i <= max; i = safeIncrement(i, step)) {
        const value = roundTo(i, PRECISION);
        if (value !== values[values.length - 1]) values.push(value);
    }

    return { min, max, range: max - min, values };
};

// Monotone cubic (Fritsch–Carlson) smoothing; falls back to straight lines for < 3 points.
const smoothPath = (points: Point[]): PathElement[] => {
    if (points.length === 0) return [];
    if (points.length <= 2) {
        return points.map((p, i) => ({ command: i === 0 ? 'M' : 'L', x: p.x, y: p.y }));
    }

    const n = points.length;
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const dxs: number[] = [];
    const dys: number[] = [];
    const ds: number[] = [];
    const ms: number[] = [];

    for (let i = 0; i < n - 1; i++) {
        dys[i] = ys[i + 1] - ys[i];
        dxs[i] = xs[i + 1] - xs[i];
        ds[i] = dys[i] / dxs[i];
    }

    ms[0] = ds[0];
    ms[n - 1] = ds[n - 2];
    for (let i = 1; i < n - 1; i++) {
        if (ds[i] === 0 || ds[i - 1] === 0 || ds[i - 1] > 0 !== ds[i] > 0) {
            ms[i] = 0;
        } else {
            ms[i] =
                (3 * (dxs[i - 1] + dxs[i])) /
                ((2 * dxs[i] + dxs[i - 1]) / ds[i - 1] + (dxs[i] + 2 * dxs[i - 1]) / ds[i]);
            if (!isFinite(ms[i])) ms[i] = 0;
        }
    }

    const path: PathElement[] = [{ command: 'M', x: xs[0], y: ys[0] }];
    for (let i = 0; i < n - 1; i++) {
        path.push({
            command: 'C',
            x1: xs[i] + dxs[i] / 3,
            y1: ys[i] + (ms[i] * dxs[i]) / 3,
            x2: xs[i + 1] - dxs[i] / 3,
            y2: ys[i + 1] - (ms[i + 1] * dxs[i]) / 3,
            x: xs[i + 1],
            y: ys[i + 1],
        });
    }
    return path;
};

const stringifyPath = (path: PathElement[], close = false): string => {
    const r = (v: number) => roundTo(v, PATH_ACCURACY);
    return (
        path
            .map((el) =>
                el.command === 'C'
                    ? `C${r(el.x1)},${r(el.y1)},${r(el.x2)},${r(el.y2)},${r(el.x)},${r(el.y)}`
                    : `${el.command}${r(el.x)},${r(el.y)}`,
            )
            .join('') + (close ? 'Z' : '')
    );
};

// Render a single-series line chart as an `<svg>` string.
// @param options layout options (sizes, offsets, axis titles, grid / area toggles)
// @param labels  X axis labels, one per value
// @param values  Y values
export const createGraph = (options: ChartOptions, labels: string[], values: number[]): string => {
    const { width, height, axisX, axisY, chartPadding: padding } = options;

    // Drawing area: (x1, y1) is bottom-left, (x2, y2) is top-right.
    const rect = {
        x1: padding.left + axisY.offset,
        x2: Math.max(width - padding.right, padding.left + axisY.offset + 1),
        y2: padding.top,
        y1: Math.max(height - padding.bottom - axisX.offset, padding.top + 1),
    };
    const xLength = rect.x2 - rect.x1;
    const yLength = rect.y1 - rect.y2;

    // Pad labels so every value has one.
    const xLabels = labels.slice(0, values.length);
    while (xLabels.length < values.length) xLabels.push('');

    // X axis: evenly spaced steps stretched to the full width.
    const stepLength = xLength / Math.max(1, xLabels.length - 1);
    const projectX = (index: number) => stepLength * index;

    // Y axis: auto-scaled from `low` to the highest value.
    let high = values.length ? Math.max(...values) : -Number.MAX_VALUE;
    let low = axisY.low;
    if (high <= low) {
        if (low === 0) high = 1;
        else if (low < 0) high = 0;
        else if (high > 0) low = 0;
        else {
            high = 1;
            low = 0;
        }
    }
    const bounds = getBounds(yLength, high, low, axisY.scaleMinSpace, axisY.onlyInteger);
    const projectY = (value: number) => (yLength * (value - bounds.min)) / bounds.range;

    const grids: string[] = [];
    const labelEls: string[] = [];

    // X axis grid lines and labels
    const xProjected = xLabels.map((_, i) => projectX(i));
    xProjected.forEach((projected, i) => {
        const labelLength = xProjected[i + 1]
            ? xProjected[i + 1] - projected
            : Math.max(xLength - projected, 30);
        const position = rect.x1 + projected;
        if (axisX.showGrid) {
            grids.push(
                `<line x1="${position}" x2="${position}" y1="${rect.y2}" y2="${
                    rect.y2 + yLength
                }" class="ct-grid ct-horizontal"></line>`,
            );
        }
        labelEls.push(
            `<text x="${position + axisX.labelOffset.x}" y="${
                rect.y1 + axisX.labelOffset.y + 20
            }" width="${labelLength}" height="${Math.max(
                0,
                axisX.offset - 10,
            )}" class="ct-label ct-horizontal ct-end">${escapeText(String(xLabels[i]))}</text>`,
        );
    });

    // Y axis grid lines and labels
    const yProjected = bounds.values.map(projectY);
    yProjected.forEach((projected, i) => {
        const labelLength = yProjected[i + 1]
            ? yProjected[i + 1] - projected
            : Math.max(yLength - projected, 30);
        const position = rect.y1 - projected;
        if (axisY.showGrid) {
            grids.push(
                `<line y1="${position}" y2="${position}" x1="${rect.x1}" x2="${
                    rect.x1 + xLength
                }" class="ct-grid ct-vertical"></line>`,
            );
        }
        labelEls.push(
            `<text y="${position + axisY.labelOffset.y}" x="${
                rect.x1 - 10
            }" height="${labelLength}" width="${Math.max(
                0,
                axisY.offset - 10,
            )}" class="ct-label ct-vertical ct-start">${bounds.values[i]}</text>`,
        );
    });

    // Series: area (optional), line, then points
    const points: Point[] = values.map((value, i) => ({
        x: rect.x1 + projectX(i),
        y: rect.y1 - projectY(value),
    }));
    const path = smoothPath(points);

    const seriesEls: string[] = [];
    if (options.showArea && path.length > 1) {
        const areaBase = rect.y1 - projectY(Math.max(Math.min(0, bounds.max), bounds.min));
        const first = points[0];
        const last = points[points.length - 1];
        const area: PathElement[] = [
            { command: 'M', x: first.x, y: areaBase },
            { command: 'L', x: first.x, y: first.y },
            ...path.slice(1),
            { command: 'L', x: last.x, y: areaBase },
        ];
        seriesEls.push(`<path d="${stringifyPath(area, true)}" class="ct-area"></path>`);
    }
    if (path.length) {
        seriesEls.push(`<path d="${stringifyPath(path)}" class="ct-line"></path>`);
    }
    points.forEach((p, i) => {
        seriesEls.push(
            `<line x1="${p.x}" y1="${p.y}" x2="${p.x + 0.01}" y2="${
                p.y
            }" class="ct-point" ct:value="${values[i]}"></line>`,
        );
    });

    // Axis titles
    const xTitle = `<text class="ct-axis-title ct-label" x="${
        padding.left + axisY.offset + xLength / 2
    }" y="${
        padding.top + yLength + axisX.offset
    }" dominant-baseline="text-after-edge" text-anchor="middle">${escapeText(axisX.title)}</text>`;
    const yTitleX = padding.left;
    const yTitleY = padding.top + yLength / 2;
    const yTitle = `<text class="ct-axis-title ct-label" x="${yTitleX}" y="${yTitleY}" transform="rotate(-90, ${yTitleX}, ${yTitleY})" dominant-baseline="hanging" text-anchor="middle">${escapeText(
        axisY.title,
    )}</text>`;

    return (
        `<svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="${width}" height="${height}" class="ct-chart-line">` +
        `<g class="ct-grids">${grids.join('')}</g>` +
        `<g><g class="ct-series ct-series-a">${seriesEls.join('')}</g></g>` +
        `<g class="ct-labels">${labelEls.join('')}</g>` +
        xTitle +
        yTitle +
        `</svg>`
    );
};
