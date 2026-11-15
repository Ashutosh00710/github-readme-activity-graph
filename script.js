const API = 'https://github-readme-activity-graph.ashutosh-dwivedi0710.workers.dev';
const REPO = 'https://github.com/ashutosh00710/github-readme-activity-graph';

// Theme colors, generated from src/styles/themes.ts (hex without '#')
const THEMES = [
    {
        id: 'default',
        name: 'Default',
        bg: 'ffcfe9',
        border: 'ffffff',
        title: '9e4c98',
        color: '9e4c98',
        line: '9e4c98',
        point: '403d3d',
        area: '9e4c98',
    },
    {
        id: 'github',
        name: 'GitHub',
        bg: '293036',
        border: 'ffffff',
        title: 'ffffff',
        color: 'ffffff',
        line: '9ecbff',
        point: 'f97583',
        area: '9ecbff',
    },
    {
        id: 'github-light',
        name: 'GitHub Light',
        bg: 'ffffff',
        border: 'ffffff',
        title: '000000',
        color: '000000',
        line: '9be9a8',
        point: '40c463',
        area: '9be9a8',
    },
    {
        id: 'github-compact',
        name: 'GitHub Compact',
        bg: '00000000',
        border: '8b949e',
        title: '8b949e',
        color: '8b949e',
        line: '26a641',
        point: '8b949e',
        area: '26a641',
    },
    {
        id: 'github-dark',
        name: 'GitHub Dark',
        bg: '0D1117',
        border: 'ffffff',
        title: '58A6FF',
        color: '58A6FF',
        line: '1F6FEB',
        point: '58A6FF',
        area: '1F6FEB',
    },
    {
        id: 'github-dark-dimmed',
        name: 'GitHub Dark Dimmed',
        bg: '24292F',
        border: '444c56',
        title: '539bf5',
        color: 'ADBAC7',
        line: 'ADBAC7',
        point: '539bf5',
        area: 'ADBAC7',
    },
    {
        id: 'dracula',
        name: 'Dracula',
        bg: '44475a',
        border: 'ffffff',
        title: 'f8f8f2',
        color: 'f8f8f2',
        line: 'ff79c6',
        point: 'bd93f9',
        area: 'ff79c6',
    },
    {
        id: 'gruvbox',
        name: 'Gruvbox',
        bg: '504945',
        border: 'ffffff',
        title: 'd4be98',
        color: 'd4be98',
        line: 'd8a657',
        point: 'e78a4e',
        area: 'd8a657',
    },
    {
        id: 'gotham',
        name: 'Gotham',
        bg: '0c1014',
        border: '2aa889',
        title: '2aa889',
        color: '2aa889',
        line: '599cab',
        point: '99d1ce',
        area: '2aa889',
    },
    {
        id: 'rogue',
        name: 'Rogue',
        bg: '172030',
        border: 'ffffff',
        title: 'a3b09a',
        color: 'a3b09a',
        line: 'b18bb1',
        point: 'c6797e',
        area: 'b18bb1',
    },
    {
        id: 'xcode',
        name: 'Xcode',
        bg: '202124',
        border: 'ffffff',
        title: 'fcfcfa',
        color: 'fcfcfa',
        line: 'c4e3ff',
        point: 'ff8070',
        area: 'c4e3ff',
    },
    {
        id: 'radical',
        name: 'Radical',
        bg: '141321',
        border: 'ffffff',
        title: 'a9fef7',
        color: 'a9fef7',
        line: 'fe428e',
        point: 'f8d847',
        area: 'fe428e',
    },
    {
        id: 'coral',
        name: 'Coral',
        bg: '9a3838',
        border: 'ffffff',
        title: 'f9fae9',
        color: 'f9fae9',
        line: 'f4e23d',
        point: 'f4e7e7',
        area: 'f4e23d',
    },
    {
        id: 'react',
        name: 'React',
        bg: '282c34',
        border: 'ffffff',
        title: 'ffffff',
        color: 'ffffff',
        line: '61dafb',
        point: '61dafb',
        area: '61dafb',
    },
    {
        id: 'react-dark',
        name: 'React Dark',
        bg: '0d1117',
        border: 'ffffff',
        title: '5bcdec',
        color: '5bcdec',
        line: '5bcdec',
        point: 'ffffff',
        area: '5bcdec',
    },
    {
        id: 'nord',
        name: 'Nord',
        bg: '2e3440',
        border: 'ffffff',
        title: '88c0d0',
        color: '88c0d0',
        line: '88c0d0',
        point: 'ffffff',
        area: '88c0d0',
    },
    {
        id: 'lucent',
        name: 'Lucent',
        bg: 'cccccc',
        border: '000000',
        title: '000000',
        color: '000000',
        line: 'ffd369',
        point: 'faf3e0',
        area: 'ffd369',
    },
    {
        id: 'chartreuse-dark',
        name: 'Chartreuse Dark',
        bg: '000000',
        border: '000000',
        title: '7ffe00',
        color: '7ffe00',
        line: '00adfe',
        point: '7ffe00',
        area: '00adfe',
    },
    {
        id: 'minimal',
        name: 'Minimal',
        bg: 'ffffff',
        border: 'ffffff',
        title: '000000',
        color: '000000',
        line: 'd3e6fa',
        point: '3f99ed',
        area: 'd3e6fa',
    },
    {
        id: 'material-palenight',
        name: 'Material Palenight',
        bg: '292d3e',
        border: 'ffffff',
        title: 'a6accd',
        color: 'a6accd',
        line: 'c792ea',
        point: '89ddff',
        area: 'c792ea',
    },
    {
        id: 'green',
        name: 'Green',
        bg: 'dad7cd',
        border: 'ffffff',
        title: '3a5a40',
        color: '3a5a40',
        line: '588157',
        point: '344e41',
        area: '588157',
    },
    {
        id: 'noctis-minimus',
        name: 'Noctis Minimus',
        bg: '1b2932',
        border: 'ffffff',
        title: 'd3b692',
        color: 'd3b692',
        line: '72b7c0',
        point: 'c5cdd3',
        area: '72b7c0',
    },
    {
        id: 'one-dark',
        name: 'One Dark',
        bg: '282C34',
        border: 'ffffff',
        title: 'abb2bf',
        color: 'abb2bf',
        line: 'e5c17c',
        point: 'e06c75',
        area: 'e5c17c',
    },
    {
        id: 'monokai',
        name: 'Monokai',
        bg: '2D2A2E',
        border: 'ffffff',
        title: 'fcfcfa',
        color: 'fcfcfa',
        line: 'ff6188',
        point: 'ffd866',
        area: 'ff6188',
    },
    {
        id: 'elegant',
        name: 'Elegant',
        bg: '161e2d',
        border: '161e2d',
        title: 'd8d5d5',
        color: 'd8d5d5',
        line: 'fb8500',
        point: '42002b',
        area: '006699',
    },
    {
        id: 'aqua',
        name: 'Aqua',
        bg: '52b69a',
        border: '161e2d',
        title: '187177',
        color: '187177',
        line: '226d64',
        point: '156f69',
        area: '226d64',
    },
    {
        id: 'synthwave-84',
        name: 'Synthwave-84',
        bg: '2C223B',
        border: '251e30',
        title: 'FF3CA2',
        color: 'FF3CA2',
        line: 'F7F645',
        point: '22E5F4',
        area: '3A2442',
    },
    {
        id: 'merko',
        name: 'Merko',
        bg: '0a0f0b',
        border: 'ffffff',
        title: 'f6f8fa',
        color: 'f6f8fa',
        line: 'abd200',
        point: 'f6f8fa',
        area: 'abd200',
    },
    {
        id: 'vue',
        name: 'Vue',
        bg: '2c3e50',
        border: 'ffffff',
        title: '41b883',
        color: '41b883',
        line: '41b883',
        point: 'f6f8fa',
        area: '41b883',
    },
    {
        id: 'tokyo-day',
        name: 'Tokyo Day',
        bg: 'e5e8d8',
        border: 'ffffff',
        title: '8f5a02',
        color: '8f5a02',
        line: '8f5a02',
        point: '562e49',
        area: '8f5a02',
    },
    {
        id: 'tokyo-night',
        name: 'Tokyo Night',
        bg: '1a1b27',
        border: 'ffffff',
        title: '70a5fd',
        color: '70a5fd',
        line: '70a5fd',
        point: 'a9b1d6',
        area: '70a5fd',
    },
    {
        id: 'high-contrast',
        name: 'High Contrast',
        bg: '000000',
        border: 'ffffff',
        title: 'e7e7e7',
        color: 'e7e7e7',
        line: 'e7e7e7',
        point: 'e7e7e7',
        area: 'e7e7e7',
    },
    {
        id: 'cobalt',
        name: 'Cobalt',
        bg: '193549',
        border: 'ffffff',
        title: 'd19a66',
        color: 'd19a66',
        line: 'd19a66',
        point: 'e7e7e7',
        area: 'd19a66',
    },
    {
        id: 'material',
        name: 'Material',
        bg: '263238',
        border: 'ffffff',
        title: '80cbc4',
        color: '80cbc4',
        line: '80cbc4',
        point: 'ffab91',
        area: '80cbc4',
    },
    {
        id: 'nightowl',
        name: 'Night Owl',
        bg: '011627',
        border: 'ffffff',
        title: 'c792ea',
        color: 'c792ea',
        line: 'c792ea',
        point: 'ffeb95',
        area: 'c792ea',
    },
    {
        id: 'modern-lilac',
        name: 'Modern Lilac',
        bg: '0a0e12',
        border: '1c1e26',
        title: '5d417a',
        color: '5d417a',
        line: '5d417a',
        point: 'fab795',
        area: '5d417a',
    },
    {
        id: 'arctic',
        name: 'Arctic',
        bg: '03203C',
        border: 'ffffff',
        title: '5DA3FA',
        color: '5DA3FA',
        line: '5DA3FA',
        point: '2827CC',
        area: '51E1ED',
    },
    {
        id: 'espresso',
        name: 'Espresso',
        bg: '2b1d14',
        border: 'ffffff',
        title: 'e8c39e',
        color: 'e8c39e',
        line: 'c68958',
        point: 'e8c39e',
        area: 'c68958',
    },
];

// URL parameter -> theme field, for the seven color options
const COLOR_PARAMS = {
    bg_color: 'bg',
    border_color: 'border',
    title_color: 'title',
    color: 'color',
    line: 'line',
    point: 'point',
    area_color: 'area',
};
const DEFAULT_DAYS = 31;
const DEFAULT_HEIGHT = 420;

const $ = (id) => document.getElementById(id);
const el = {
    form: $('build-form'),
    username: $('username'),
    buildButton: $('build-button'),
    status: $('status'),
    themeDropdown: $('theme-dropdown'),
    themeButton: $('theme-button'),
    themeList: $('theme-list'),
    resetColors: $('reset-colors'),
    hideTitle: $('hide_title'),
    customTitle: $('custom_title'),
    days: $('days'),
    from: $('from'),
    to: $('to'),
    rangeHint: $('range-hint'),
    height: $('height'),
    radius: $('radius'),
    area: $('area'),
    grid: $('grid'),
    hideBorder: $('hide_border'),
    preview: $('preview'),
    previewImage: $('preview-image'),
    markdown: $('markdown'),
    copyButton: $('copy-button'),
    openLink: $('open-link'),
    themeToggle: $('theme-toggle'),
};
const colorInputs = [...document.querySelectorAll('input[type="color"][data-param]')];

const state = {
    username: '',
    theme: THEMES[0],
    overrides: {}, // color params the user picked by hand: { line: 'ff0000', ... }
    svg: '', // last graph fetched from the server
    fetchedKey: '', // which layout/data options `svg` was fetched with
    rendered: false, // whether the draw-in animation already played
    objectUrl: '',
    requestId: 0,
};

/* ---------- Helpers ---------- */

const setStatus = (message, tone) => {
    el.status.textContent = message || '';
    if (tone) el.status.dataset.tone = tone;
    else delete el.status.dataset.tone;
};

const today = () => new Date().toISOString().slice(0, 10);

// 'abc' / 'aabbcc' / 'aabbccdd' -> '#aabbcc' for <input type="color">
const toPickerValue = (hex) => {
    let h = hex.replace('#', '');
    if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((c) => c + c).join('');
    return `#${h.slice(0, 6).padEnd(6, '0')}`;
};
// '#rrggbbaa' with alpha 00 -> 'transparent', otherwise '#hex' for CSS
const toCss = (hex) => {
    const h = hex.replace('#', '');
    if ((h.length === 8 && h.endsWith('00')) || (h.length === 4 && h.endsWith('0')))
        return 'transparent';
    return `#${h}`;
};

const rangeMode = () => document.querySelector('input[name="range"]:checked').value;

// Mirrors Utilities.getColors() in src/utils.ts
const effectiveColors = () => {
    const t = state.theme;
    const o = state.overrides;
    return {
        bg: o.bg_color || t.bg,
        border: o.border_color || (el.hideBorder.checked ? '0000' : t.border),
        title: o.title_color || o.color || t.title,
        color: o.color || t.color,
        line: o.line || t.line,
        point: o.point || t.point,
        area: o.area_color || t.area,
    };
};

const dateRange = () => {
    if (rangeMode() !== 'dates') return null;
    const from = el.from.value;
    const to = el.to.value;
    if (!from || !to) return { error: 'Pick both dates.' };
    if (from >= to) return { error: '“From” must be before “To”.' };
    if (to > today()) return { error: 'Dates can’t be in the future.' };
    return { from, to };
};

// Options that change what the server draws (everything else is applied locally)
const layoutParams = () => {
    const params = new URLSearchParams();
    const range = dateRange();
    if (range && range.from) {
        params.set('from', range.from);
        params.set('to', range.to);
    } else if (rangeMode() === 'days' && Number(el.days.value) !== DEFAULT_DAYS) {
        params.set('days', el.days.value);
    }
    if (Number(el.height.value) !== DEFAULT_HEIGHT) params.set('height', el.height.value);
    if (Number(el.radius.value) > 0) params.set('radius', el.radius.value);
    if (el.hideTitle.checked) params.set('hide_title', 'true');
    else if (el.customTitle.value.trim()) params.set('custom_title', el.customTitle.value.trim());
    return params;
};

// Full URL for the README
const readmeUrl = () => {
    const params = new URLSearchParams({ username: state.username });
    if (state.theme.id !== 'default') params.set('theme', state.theme.id);
    for (const [param, value] of Object.entries(state.overrides)) params.set(param, value);
    if (el.area.checked) params.set('area', 'true');
    if (el.hideBorder.checked && !state.overrides.border_color) params.set('hide_border', 'true');
    if (!el.grid.checked) params.set('grid', 'false');
    for (const [key, value] of layoutParams()) params.set(key, value);
    return `${API}/graph?${params}`;
};

// URL the preview is fetched from: layout options only, area always on (hidden locally)
const previewUrl = () => {
    const params = new URLSearchParams({ username: state.username, area: 'true' });
    for (const [key, value] of layoutParams()) params.set(key, value);
    return `${API}/graph?${params}`;
};

/* ---------- Controls -> UI ---------- */

const syncControls = () => {
    const colors = effectiveColors();
    colorInputs.forEach((input) => {
        const param = input.dataset.param;
        const value = colors[COLOR_PARAMS[param]];
        input.value = toPickerValue(value);
        const css = toCss(value);
        const label = input.closest('.swatch').querySelector('code');
        label.textContent = css === 'transparent' ? 'transparent' : toPickerValue(value);
        input.closest('.swatch').classList.toggle('swatch--edited', param in state.overrides);
        input.closest('.swatch').classList.toggle('swatch--transparent', css === 'transparent');
    });
    el.resetColors.hidden = Object.keys(state.overrides).length === 0;

    // filled part of each slider track
    [el.days, el.height, el.radius].forEach((range) => {
        const pct = ((range.value - range.min) / (range.max - range.min)) * 100;
        range.style.setProperty('--fill', `${pct}%`);
    });
    $('days-value').textContent = el.days.value;
    $('height-value').textContent = el.height.value;
    $('radius-value').textContent = el.radius.value;
    el.customTitle.disabled = el.hideTitle.checked;

    const mode = rangeMode();
    document.querySelector('[data-range="days"]').hidden = mode !== 'days';
    document.querySelector('[data-range="dates"]').hidden = mode !== 'dates';
    const range = dateRange();
    el.rangeHint.textContent = range && range.error ? range.error : '';

    el.preview.style.aspectRatio = `1200 / ${el.height.value}`;
};

const updateMarkdown = () => {
    if (!state.username) return;
    const url = readmeUrl();
    el.markdown.value = `[![${state.username}'s GitHub activity graph](${url})](${REPO})`;
    el.copyButton.disabled = false;
    el.openLink.href = url;
    el.openLink.hidden = false;
};

/* ---------- Preview ---------- */

const overrideCss = () => {
    const c = effectiveColors();
    const css = [
        `#cardBg{fill:${toCss(c.bg)}!important;stroke:${toCss(c.border)}!important}`,
        `.header{color:${toCss(c.title)}!important}`,
        `.ct-label{fill:${toCss(c.color)}!important;color:${toCss(c.color)}!important}`,
        `.ct-grid{stroke:${toCss(c.color)}!important}`,
        `.ct-line{stroke:${toCss(c.line)}!important}`,
        `.ct-point{stroke:${toCss(c.point)}!important}`,
        `.ct-series-a .ct-area{fill:${toCss(c.area)}!important}`,
    ];
    if (!el.area.checked) css.push('.ct-area{display:none}');
    if (!el.grid.checked) css.push('.ct-grid{display:none}');
    if (state.rendered) {
        css.push('.ct-line{animation:none!important;stroke-dashoffset:0!important}');
        css.push('.ct-point{animation:none!important}');
    }
    return css.join('');
};

const renderPreview = () => {
    if (!state.svg) return;
    const styled = state.svg.replace(/<\/svg>\s*$/, `<style>${overrideCss()}</style></svg>`);
    const url = URL.createObjectURL(new Blob([styled], { type: 'image/svg+xml' }));
    const previous = state.objectUrl;
    state.objectUrl = url;
    el.previewImage.onload = () => previous && URL.revokeObjectURL(previous);
    el.previewImage.src = url;
    el.previewImage.alt = `${state.username}'s GitHub activity graph`;
    el.previewImage.hidden = false;
    el.preview.dataset.state = 'ready';
    state.rendered = true;
};

const fetchGraph = async () => {
    const url = previewUrl();
    const id = ++state.requestId;
    el.preview.dataset.state = state.svg ? 'refreshing' : 'loading';
    const response = await fetch(url);
    const svg = await response.text();
    if (id !== state.requestId) return false; // a newer request superseded this one
    if (!response.ok || !svg.includes('ct-chart-line')) {
        // The server answers with a small error SVG; surface its message
        const message = new DOMParser()
            .parseFromString(svg, 'image/svg+xml')
            .querySelector('text')?.textContent;
        throw new Error(message || `Request failed (${response.status})`);
    }
    state.svg = svg;
    state.fetchedKey = layoutParams().toString();
    state.rendered = false;
    renderPreview();
    return true;
};

const describeRange = () => {
    const range = dateRange();
    if (range && range.from) return `from ${range.from} to ${range.to}`;
    return `for the last ${el.days.value} days`;
};

// Called whenever any control changes
let layoutTimer;
const onChange = () => {
    syncControls();
    updateMarkdown();
    if (!state.username) return;

    const range = dateRange();
    if (range && range.error) return; // wait for a valid date range

    if (layoutParams().toString() === state.fetchedKey) {
        renderPreview(); // colors / toggles only
        return;
    }
    clearTimeout(layoutTimer);
    layoutTimer = setTimeout(async () => {
        try {
            if (await fetchGraph()) setStatus(`Showing ${state.username} ${describeRange()}.`);
        } catch (error) {
            el.preview.dataset.state = state.svg ? 'ready' : 'empty';
            setStatus(error.message, 'error');
        }
    }, 450);
};

/* ---------- Build ---------- */

const setBusy = (busy) => {
    el.buildButton.disabled = busy;
    el.buildButton.dataset.busy = String(busy);
    el.buildButton.textContent = busy ? 'Building…' : 'Build graph';
};

const build = async (event) => {
    event.preventDefault();
    const username = el.username.value.trim().replace(/^@/, '');
    if (!username) {
        setStatus('Enter a GitHub username first.', 'error');
        el.username.focus();
        return;
    }
    const range = dateRange();
    if (range && range.error) {
        setStatus(range.error, 'error');
        return;
    }

    const previousUsername = state.username;
    setBusy(true);
    setStatus('Fetching contributions…');
    state.username = username;
    try {
        if (await fetchGraph()) {
            updateMarkdown();
            setStatus(`Showing ${username} ${describeRange()}.`);
        }
    } catch (error) {
        console.error(error);
        state.username = previousUsername;
        el.preview.dataset.state = state.svg ? 'ready' : 'empty';
        setStatus(error.message || 'Something went wrong. Please try again.', 'error');
    } finally {
        setBusy(false);
    }
};

/* ---------- Theme dropdown ---------- */

const chipStyle = (t) =>
    `--chip-bg:${toCss(t.bg) === 'transparent' ? 'transparent' : toCss(t.bg)};` +
    `--chip-line:${toCss(t.line)};--chip-point:${toCss(t.point)}`;

const renderThemeList = () => {
    el.themeList.innerHTML = THEMES.map(
        (t, i) =>
            `<li role="option" id="theme-opt-${i}" data-index="${i}" aria-selected="${t === state.theme}">` +
            `<span class="theme-chip" style="${chipStyle(t)}" aria-hidden="true"></span>` +
            `<span>${t.name}</span></li>`,
    ).join('');
};

const syncThemeButton = () => {
    el.themeButton.querySelector('.dropdown__value').textContent = state.theme.name;
    el.themeButton.querySelector('.theme-chip').setAttribute('style', chipStyle(state.theme));
};

let activeIndex = 0;
const setActive = (index) => {
    activeIndex = (index + THEMES.length) % THEMES.length;
    el.themeList.querySelectorAll('[role="option"]').forEach((li, i) => {
        li.classList.toggle('is-active', i === activeIndex);
    });
    const active = $(`theme-opt-${activeIndex}`);
    el.themeList.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
};

const openDropdown = () => {
    renderThemeList();
    el.themeList.hidden = false;
    el.themeButton.setAttribute('aria-expanded', 'true');
    setActive(THEMES.indexOf(state.theme));
    el.themeList.focus();
};

const closeDropdown = (focusButton = true) => {
    if (el.themeList.hidden) return;
    el.themeList.hidden = true;
    el.themeButton.setAttribute('aria-expanded', 'false');
    if (focusButton) el.themeButton.focus();
};

const chooseTheme = (index) => {
    state.theme = THEMES[index];
    state.overrides = {}; // a theme starts fresh
    syncThemeButton();
    closeDropdown();
    onChange();
};

let typeahead = '';
let typeaheadTimer;
el.themeButton.addEventListener('click', () =>
    el.themeList.hidden ? openDropdown() : closeDropdown(),
);
el.themeButton.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openDropdown();
    }
});
el.themeList.addEventListener('keydown', (event) => {
    const keys = {
        ArrowDown: () => setActive(activeIndex + 1),
        ArrowUp: () => setActive(activeIndex - 1),
        Home: () => setActive(0),
        End: () => setActive(THEMES.length - 1),
        Enter: () => chooseTheme(activeIndex),
        ' ': () => chooseTheme(activeIndex),
        Escape: () => closeDropdown(),
        Tab: () => closeDropdown(false),
    };
    if (keys[event.key]) {
        if (event.key !== 'Tab') event.preventDefault();
        keys[event.key]();
    } else if (event.key.length === 1) {
        // type to jump to a theme
        typeahead += event.key.toLowerCase();
        clearTimeout(typeaheadTimer);
        typeaheadTimer = setTimeout(() => (typeahead = ''), 600);
        const match = THEMES.findIndex((t) => t.name.toLowerCase().startsWith(typeahead));
        if (match >= 0) setActive(match);
    }
});
el.themeList.addEventListener('click', (event) => {
    const option = event.target.closest('[role="option"]');
    if (option) chooseTheme(Number(option.dataset.index));
});
el.themeList.addEventListener('mousemove', (event) => {
    const option = event.target.closest('[role="option"]');
    if (option && Number(option.dataset.index) !== activeIndex)
        setActive(Number(option.dataset.index));
});
document.addEventListener('pointerdown', (event) => {
    if (!el.themeDropdown.contains(event.target)) closeDropdown(false);
});

/* ---------- Other controls ---------- */

colorInputs.forEach((input) =>
    input.addEventListener('input', () => {
        const param = input.dataset.param;
        state.overrides[param] = input.value.slice(1);
        // The server lets border_color win over hide_border
        if (param === 'border_color') el.hideBorder.checked = false;
        onChange();
    }),
);
el.hideBorder.addEventListener('change', () => {
    if (el.hideBorder.checked) delete state.overrides.border_color;
    onChange();
});
el.resetColors.addEventListener('click', () => {
    state.overrides = {};
    onChange();
});
[el.hideTitle, el.area, el.grid, el.from, el.to].forEach((input) =>
    input.addEventListener('change', onChange),
);
[el.customTitle, el.days, el.height, el.radius].forEach((input) =>
    input.addEventListener('input', onChange),
);
document
    .querySelectorAll('input[name="range"]')
    .forEach((input) => input.addEventListener('change', onChange));
el.form.addEventListener('submit', build);

/* ---------- Copy ---------- */

el.copyButton.addEventListener('click', async () => {
    if (!el.markdown.value) return;
    try {
        await navigator.clipboard.writeText(el.markdown.value);
    } catch {
        el.markdown.select();
        document.execCommand('copy');
    }
    el.copyButton.textContent = 'Copied';
    el.copyButton.dataset.copied = 'true';
    setTimeout(() => {
        el.copyButton.textContent = 'Copy';
        delete el.copyButton.dataset.copied;
    }, 1800);
});

/* ---------- Light / dark ---------- */

const syncThemeToggle = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    el.themeToggle.textContent = dark ? '☼ Light' : '☾ Dark';
    el.themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
};
el.themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
        localStorage.setItem('theme', next);
    } catch {
        /* storage unavailable */
    }
    syncThemeToggle();
});

/* ---------- Init ---------- */

el.from.max = today();
el.to.max = today();
syncThemeButton();
syncThemeToggle();
syncControls();
