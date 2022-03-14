const co = require('co');
const chartist = require('../node_modules/node-chartist/lib/chartist');
const generateChart = require('../node_modules/node-chartist/lib/chart');
const generateLegend = require('../node_modules/node-chartist/lib/legend');
const is = require('is_js');
const R = require('ramda');
const Ru = require('@panosoft/ramda-utils');

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

export const createGraph = R.curryN(
    3,
    co.wrap(function* (type: string, options: any, data: any) {
        const environment = yield chartist.initialize();
        const window = environment.window;
        const Chartist = environment.Chartist;
        // process options
        options = is.function(options) ? options(Chartist) : options;
        if (is.not.json(options))
            throw new TypeError('options must be an object or a function that returns an object.');
        options = Ru.defaults({ legend: false }, options);
        // create chart
        const chart = yield generateChart(Chartist, window, type, options, data);
        const legend = options.legend ? generateLegend(data) : '';
        return `${chart}${legend}`;
    })
);

export default { chartist };
