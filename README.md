<p align="center">
    <img src="asset/logo.svg" height="150">
</p>

<h1 align="center">Github Readme Activity Graph</h1>

<p align="center">
    <img src="https://emoji.gg/assets/emoji/5643_github_octocat.png" height=100></img>
</p>

A dynamically generated activity graph to show your GitHub activities of last 31 days.

## How to Use ? 🤔

Just paste the following URL in your profile readme and you are good to go.

**Pass your `username` in the URL**

```md
https://activity-graph.herokuapp.com/graph?username=Ashutosh00710
```

## Use themes

_`username=ashutosh00710&theme=theme_name`_

```md
https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=dracula
```

[Manual Customization](#customization) is also available

## Available Themes

|            Name            |                                                       Preview                                                       |
| :------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| **Default (cotton candy)** |        <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710" height=250 alt="graph"/>        |
|        **dracula**         | <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=dracula" height=250 alt="graph"/> |
|        **gruvbox**         | <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=gruvbox" height=250 alt="graph"/> |
|         **rogue**          |  <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=rogue" height=250 alt="graph"/>  |
|         **github**         | <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=github" height=250 alt="graph"/>  |
|         **xcode**          |  <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=xcode" height=250 alt="graph"/>  |
|         **coral**          |  <img src="https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=coral" height=250 alt="graph"/>  |

## Customization

Customize the appearance of your Activity Graph however you want with URL params.

#### Common Options

| Arguments  |                  Description                  |       Type of Value        |
| :--------: | :-------------------------------------------: | :------------------------: |
| `bg_color` |            card's background color            |   hex code (without `#`)   |
|  `color`   |            graph card's text color            |   hex code (without `#`)   |
|   `line`   |              graph's line color               |   hex code (without `#`)   |
|  `point`   |         color of points on line graph         |   hex code (without `#`)   |
|   `area`   |          shows area under the graph           | boolean (default: `false`) |
|  `theme`   | name of [available themes](#available-themes) |           string           |

**Example:**

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=ashutosh00710&bg_color=f4fa9c&color=17b978&line=17b978&point=17b978&area=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

## Resources Used to build this project

|      Purpose       |  Library Name   |                   Link                    |
| :----------------: | :-------------: | :---------------------------------------: |
| Graph Construction | **CHARTISH.JS** | <https://github.com/gionkunz/chartist-js> |

</br>
<hr/>

### Made with ❤ and TypeScript 😉
