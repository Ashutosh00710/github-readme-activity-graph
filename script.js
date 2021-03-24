let valueToCopy = {
  username: '',
  bgColor: '#ffcfe9',
  color: '#9e4c98',
  line: '#9e4c98',
  point: '#403d3d',
};

//Get submit button
let submitButton = document.getElementById('submit-button');
//on click event
submitButton.addEventListener('click', (event) => {
  //get username
  var username = document.getElementById('username').value;
  if (username.length > 0) {
    valueToCopy.username = username;
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
    })
    .catch((err) => console.error(err));
});
//Dynamic changes
let bgInput = document.getElementById('bgColor');
let lineInput = document.getElementById('line');
let colorInput = document.getElementById('color');
let pointInput = document.getElementById('point');

//Background
bgInput.addEventListener('input', function () {
  valueToCopy.bgColor = bgInput.value;
  document.querySelector('.rect').style.backgroundColor = bgInput.value;
});

//line
lineInput.addEventListener('input', function () {
  valueToCopy.line = lineInput.value;
  document.querySelector('.ct-line').style.stroke = lineInput.value;
});

function loopTroughQueries(className, styleAttributes) {
  console.log(styleAttributes[0]);
  let allElementsToChange = document.querySelectorAll(`${className}`);
  var index = 0,
    length = allElementsToChange.length;
  for (; index < length; index++) {
    if (styleAttributes.length === 2) {
      allElementsToChange[index].style.styleAttributes[0] = colorInput.value;
      allElementsToChange[index].style.styleAttributes[1] = colorInput.value;
    } else {
      allElementsToChange[index].style.styleAttributes[0] = colorInput.value;
    }
  }
}

colorInput.addEventListener('input', function () {
  loopTroughQueries('.ct-label', ['fill', 'color']);
  // loopTroughQueries('.ct-axis-title', colorInput, ['fill']);
  // loopTroughQueries('.ct-grid', colorInput, ['stroke']);
});

//color
// function color() {
//   let theInput = document.getElementById('color');
//   theInput.addEventListener('input', function () {
//     valueToCopy.color = theInput.value;
//     let allLables = document.querySelectorAll('.ct-label');
//     var index = 0,
//       length = allLables.length;
//     for (; index < length; index++) {
//       allLables[index].style.fill = theInput.value;
//       allLables[index].style.color = theInput.value;
//     }
//   });

//   theInput.addEventListener('input', function () {
//     let allLables = document.querySelectorAll('.ct-axis-title');
//     var index = 0,
//       length = allLables.length;
//     for (; index < length; index++) {
//       allLables[index].style.fill = theInput.value;
//     }
//   });

//   theInput.addEventListener('input', function () {
//     let allLables = document.querySelectorAll('.ct-grid');
//     var index = 0,
//       length = allLables.length;
//     for (; index < length; index++) {
//       allLables[index].style.stroke = theInput.value;
//     }
//   });
// }
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
//color();
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
