let valueToCopy = {
  username: '',
  bgColor: '#ffcfe9',
  color: '#9e4c98',
  line: '#9e4c98',
  point: '#403d3d',
};

/*-------- Dark Theme Mode---------*/
let darkMode = localStorage.getItem('darkMode');
const toggleBtn = document.querySelector('.toggle-btn');
const bgColor = document.querySelector('.bg-color');

const enableDarkMode = () => {
  bgColor.classList.add('active');
  localStorage.setItem('darkMode', 'enabled');
};
const disableDarkMode = () => {
  bgColor.classList.remove('active');
  localStorage.setItem('darkMode', '');
};
if (darkMode === 'enabled') {
  enableDarkMode();
}

toggleBtn.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');

  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

/*-------- For displaying loading animation ---------*/

const loader = document.querySelector('.loader');
const setLoader = () => {
  loader.classList.add('active');
};
const removeLoader = () => {
  loader.classList.remove('active');
};

const removePlaceholder = () => {
  const placeholder = document.querySelector('.chart_placeholder');
  const adjustMargin = document.querySelector('.copy_container');
  placeholder.classList.remove('active');
  adjustMargin.style.marginTop = '2rem';
};

//Get submit button
let submitButton = document.getElementById('submit-button');
//on click event
submitButton.addEventListener('click', (event) => {
  //get username

  event.preventDefault();
  var username = document.getElementById('username').value;
  if (username.length > 0) {
    valueToCopy.username = username;
    setLoader();
  } else {
    alert('Enter your Username');
    return;
  }

  //get user data
  axios({
    url: `https://activity-graph.herokuapp.com/data?username=${username}`,
    method: 'GET',
  })
    .then((contributionData) => {
      console.log(contributionData.data);
      let userData = contributionData.data;
      var data = {
        labels: [...Array(userData.contributions.length + 1).keys()].slice(1),
        series: [{ value: userData.contributions }],
      };
      const options = {
        width: 1000,
        height: 380,
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
        showArea: true,
        fullWidth: true,
        plugins: [
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: 'Days',
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 50,
              },
              textAnchor: 'middle',
            },
            axisY: {
              axisTitle: 'Contributions',
              axisClass: 'ct-axis-title',
              offset: {
                x: 0,
                y: 50,
              },
              textAnchor: 'middle',
              flipTitle: true,
            },
          }),
        ],
      };
      new Chartist.Line('.ct-chart', data, options);
      removeLoader();
      removePlaceholder();
      generateLink();
    })
    .catch((err) => {
      console.error(err);
      removeLoader();
      alert('Sorry! something went wrong.');
    });
});

//Dynamic changes

// Background Color
function changeBgColor() {
  const bgInput = document.getElementById('bgColor');
  bgInput.addEventListener('input', function () {
    valueToCopy.bgColor = bgInput.value;
    document.querySelector('.rect').style.backgroundColor = bgInput.value;
    generateLink();
  });
}

// Line Color
function changeLineColor() {
  const lineInput = document.getElementById('line');
  lineInput.addEventListener('input', function () {
    valueToCopy.line = lineInput.value;
    document.querySelector('.ct-line').style.stroke = lineInput.value;
    generateLink();
  });
}

//Lables, Title and Grid color
function changeLabelsAndGridColor() {
  const ltgInput = document.getElementById('color');

  const changeColor = () => {
    valueToCopy.color = ltgInput.value;
    const allLables = document.querySelectorAll('.ct-label');
    const axisTitles = document.querySelectorAll('.ct-axis-title');
    const grids = document.querySelectorAll('.ct-grid');

    const labelLength = allLables.length;
    const axisTitleLength = axisTitles.length;
    const gridLength = grids.length;

    for (let index = 0; index < labelLength; index++) {
      allLables[index].style.fill = ltgInput.value;
      allLables[index].style.color = ltgInput.value;
    }
    for (let index = 0; index < axisTitleLength; index++) {
      axisTitles[index].style.fill = ltgInput.value;
    }
    for (let index = 0; index < gridLength; index++) {
      grids[index].style.stroke = ltgInput.value;
    }
    generateLink();
  };

  ltgInput.addEventListener('input', changeColor);
}

// Point Color
function changePointColor() {
  const pointInput = document.getElementById('point');
  pointInput.addEventListener('input', function () {
    valueToCopy.point = pointInput.value;
    const allPointLables = document.querySelectorAll('.ct-point');
    const len = allPointLables.length;
    for (let idx = 0; idx < len; idx++) {
      allPointLables[idx].style.stroke = pointInput.value;
    }
    generateLink();
  });
}

changeBgColor();
changeLineColor();
changePointColor();
changeLabelsAndGridColor();

const copyButton = document.querySelector('.copy_text').childNodes[3];
const textArea = document.querySelector('.text');
// Generate Chart Link
function generateLink() {
  let link = `[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=${
    valueToCopy.username
  }&bg_color=${valueToCopy.bgColor.slice(1)}&color=${valueToCopy.color.slice(
    1
  )}&line=${valueToCopy.line.slice(1)}&point=${valueToCopy.point.slice(
    1
  )}&area=true&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)`;
  textArea.value = link;
  copyButton.style.backgroundColor = 'rgb(87, 132, 245)';
  return link;
}

// Copy to clipboard
const copyLink = () => {
  console.log(copyButton.style);
  if (textArea.value !== '') {
    if (copyButton.style.backgroundColor === 'rgb(87, 132, 245)') {
      const copiedText = generateLink();
      navigator.clipboard.writeText(copiedText);
      copyButton.style.backgroundColor = '#2bbe60';
      const copyText = document.querySelector('.copy_text');
      const input = copyText.querySelector('input.text');
      input.select();
      copyText.classList.add('active');
      setTimeout(() => {
        copyText.classList.remove('active');
      }, 2500);
    }
  }
};

copyButton.addEventListener('click', copyLink);
