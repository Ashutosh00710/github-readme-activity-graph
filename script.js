let valueToCopy = {
  username: '',
  bgColor: 'ffcfe9',
  color: '9e4c98',
  line: '9e4c98',
  point: '403d3d',
};

/*-------- For displaying loading animation ---------*/

const loader = document.querySelector('.loader');
const setLoader = () => {
  loader.classList.add('active');
};
const reomveLoader = () => {
  loader.classList.remove('active');
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
      reomveLoader();
    })
    .catch((err) => {
      console.error(err);
      reomveLoader();
      alert('Sorry! something went wrong.');
    });
});

//Dynamic changes
//Background
let bgInput = document.getElementById('bgColor');
bgInput.addEventListener('input', function () {
  valueToCopy.bgColor = bgInput.value;
  document.querySelector('.rect').style.backgroundColor = bgInput.value;
  console.log(`bgInput`, bgInput.value);
});
//line
function line() {
  let theInput = document.getElementById('line');
  theInput.addEventListener('input', function () {
    valueToCopy.line = theInput.value;
    document.querySelector('.ct-line').style.stroke = theInput.value;
  });
}
//color
function color() {
  let theInput = document.getElementById('color');
  theInput.addEventListener('input', function () {
    valueToCopy.color = theInput.value;
    let allLables = document.querySelectorAll('.ct-label');
    var index = 0,
      length = allLables.length;
    for (; index < length; index++) {
      allLables[index].style.fill = theInput.value;
      allLables[index].style.color = theInput.value;
    }
  });

  theInput.addEventListener('input', function () {
    let allLables = document.querySelectorAll('.ct-axis-title');
    var index = 0,
      length = allLables.length;
    for (; index < length; index++) {
      allLables[index].style.fill = theInput.value;
    }
  });

  theInput.addEventListener('input', function () {
    let allLables = document.querySelectorAll('.ct-grid');
    var index = 0,
      length = allLables.length;
    for (; index < length; index++) {
      allLables[index].style.stroke = theInput.value;
    }
  });
}
//point
function point() {
  let pointInput = document.getElementById('point');
  pointInput.addEventListener('input', function () {
    valueToCopy.point = pointInput.value;
    let allPointLables = document.querySelectorAll('.ct-point');
    var idx = 0,
      len = allPointLables.length;
    for (; idx < len; idx++) {
      allPointLables[idx].style.stroke = pointInput.value;
    }
  });
}

//calling
line();
color();
point();

document.querySelector('.copy').addEventListener('click', copyText);
function copyText() {
  var copyText = `[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=${
    valueToCopy.username
  }&bg_color=${valueToCopy.bgColor.slice(1)}&color=${valueToCopy.color.slice(
    1
  )}&line=${valueToCopy.line.slice(1)}&point=${valueToCopy.point.slice(
    1
  )}&area=true&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)`;
  navigator.clipboard.writeText(copyText);
  alert('The copied text is: ' + copyText);
}
