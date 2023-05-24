const elements = {
    toggleBtn: document.querySelector('.toggle-btn'),
    bgColor: document.querySelector('.bg-color'),
    loader: document.querySelector('.loader'),
    placeholder: document.querySelector('.chart_placeholder'),
    copyContainer: document.querySelector('.copy_container'),
    textArea: document.querySelector('.text'),
    copyText: document.querySelector('.copy_text'),
    submitButton: document.getElementById('submit-button'),
    username: document.getElementById('username')
};

const inputElements = {
    bgInput: document.getElementById('bgColor'),
    lineInput: document.getElementById('line'),
    ltgInput: document.getElementById('color'),
    pointInput: document.getElementById('point')
};

const valueToCopy = {
    username: '',
    bgColor: '#ffcfe9',
    color: '#9e4c98',
    line: '#9e4c98',
    point: '#403d3d'
};

/*-----------------------------------------
        Fetch user's contribution data
        and generate graph link
-------------------------------------------*/

//For displaying loading animation

const setLoader = () => {
    elements.loader.classList.add('active');
};
const removeLoader = () => {
    elements.loader.classList.remove('active');
};

const removePlaceholder = () => {
    elements.placeholder.classList.remove('active');
    elements.copyContainer.style.marginTop = '2rem';
};

// Generate chart link with user data

const generateLink = () => {
    let link = `[![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=${
        valueToCopy.username
    }&bg_color=${valueToCopy.bgColor.slice(1)}&color=${valueToCopy.color.slice(
        1
    )}&line=${valueToCopy.line.slice(1)}&point=${valueToCopy.point.slice(
        1
    )}&area=true&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)`;
    elements.textArea.value = link;
    elements.copyText.childNodes[3].style.backgroundColor = 'rgb(87, 132, 245)';
    return link;
};

// Fetch user data and create graph

const getGraph = (username) => {
    // Graph Configuration

    const options = {
        height: 380,
        axisY: {
            title: 'Contributions',
            onlyInteger: true,
            offset: 70,
            labelOffset: {
                y: 4.5
            }
        },
        axisX: {
            title: 'Days',
            offset: 50,
            labelOffset: {
                x: -4.5
            }
        },
        chartPadding: {
            top: 80,
            right: 50,
            bottom: 20,
            left: 20
        },
        showArea: true,
        fullWidth: true,
        plugins: [
            Chartist.plugins.ctAxisTitle({
                axisX: {
                    axisTitle: 'Days',
                    axisClass: 'ct-axis-title',
                    offset: {
                        x: 0,
                        y: 50
                    },
                    textAnchor: 'middle'
                },
                axisY: {
                    axisTitle: 'Contributions',
                    axisClass: 'ct-axis-title',
                    offset: {
                        x: 0,
                        y: 50
                    },
                    textAnchor: 'middle',
                    flipTitle: true
                }
            })
        ]
    };

    axios({
        url: `https://github-readme-activity-graph.vercel.app/data?username=${username}`,
        method: 'GET'
    })
        .then((contributionData) => {
            const days = contributionData.data.contributions;
            const data = {
                labels: days.map((day) => day.date),
                series: [{ value: days.map((day) => day.contributionCount) }]
            };

            new Chartist.Line('.ct-chart', data, options); //Create chart

            removeLoader();
            removePlaceholder();
            generateLink();
        })
        .catch((err) => {
            console.error(err);
            removeLoader();
            alert('Sorry! something went wrong.');
        });
};

// Handle submit button
const onSubmit = (event) => {
    event.preventDefault();

    //get username
    const username = elements.username.value;
    if (username.length > 0) {
        valueToCopy.username = username;
        setLoader();
        getGraph(username);
    } else {
        alert('Enter your Username');
        return;
    }
};

/*-----------------------------------------
                Dark Theme
-------------------------------------------*/

let darkMode = localStorage.getItem('darkMode');

const enableDarkMode = () => {
    elements.bgColor.classList.add('active');
    localStorage.setItem('darkMode', 'enabled');
};
const disableDarkMode = () => {
    elements.bgColor.classList.remove('active');
    localStorage.setItem('darkMode', '');
};
if (darkMode === 'enabled') {
    enableDarkMode();
}

const handleDarkMode = () => {
    darkMode = localStorage.getItem('darkMode');

    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
};

//Dynamic changes

// Background Color
const changeBgColor = () => {
    valueToCopy.bgColor = inputElements.bgInput.value;
    document.querySelector('.rect').style.backgroundColor = inputElements.bgInput.value;
    generateLink();
};

// Line Color
const changeLineColor = () => {
    valueToCopy.line = inputElements.lineInput.value;
    document.querySelector('.ct-line').style.stroke = inputElements.lineInput.value;
    generateLink();
};

//Lables, Title and Grid color
const changeLabelsAndGridColor = () => {
    const ltgValue = inputElements.ltgInput.value;
    valueToCopy.color = ltgValue;

    const allLables = document.querySelectorAll('.ct-label');
    const axisTitles = document.querySelectorAll('.ct-axis-title');
    const grids = document.querySelectorAll('.ct-grid');

    allLables.forEach((el) => {
        el.style.fill = ltgValue;
        el.style.color = ltgValue;
    });

    axisTitles.forEach((el) => {
        el.style.fill = ltgValue;
    });
    grids.forEach((el) => {
        el.style.stroke = ltgValue;
    });

    generateLink();
};

// Point Color
const changePointColor = () => {
    valueToCopy.point = inputElements.pointInput.value;
    const allPointLables = document.querySelectorAll('.ct-point');
    const len = allPointLables.length;
    for (let idx = 0; idx < len; idx++) {
        allPointLables[idx].style.stroke = inputElements.pointInput.value;
    }
    generateLink();
};

// Copy to clipboard
const copyLink = () => {
    if (elements.textArea.value !== '') {
        let copyBtn = elements.copyText.childNodes[3];
        if (copyBtn.style.backgroundColor === 'rgb(87, 132, 245)') {
            const copiedText = elements.textArea.value;
            navigator.clipboard.writeText(copiedText);
            const input = elements.copyText.querySelector('input.text');
            input.select();

            copyBtn.style.backgroundColor = '#2bbe60';
            elements.copyText.classList.add('active');

            setTimeout(() => {
                elements.copyText.classList.remove('active');
            }, 2500);
        }
    }
};

//Event Handlers

elements.toggleBtn.addEventListener('click', handleDarkMode);
elements.submitButton.addEventListener('click', onSubmit);
elements.copyText.addEventListener('click', copyLink);
inputElements.bgInput.addEventListener('input', changeBgColor);
inputElements.lineInput.addEventListener('input', changeLineColor);
inputElements.ltgInput.addEventListener('input', changeLabelsAndGridColor);
inputElements.pointInput.addEventListener('input', changePointColor);
