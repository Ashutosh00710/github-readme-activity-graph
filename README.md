<p align="center">
    <img src="asset/logo.svg" height="150">
</p>

<h1 align="center">Github Readme Activity Graph</h1>

A dynamically generated activity graph to show your GitHub activities of last 31 days.

## How to Use ? 🤔

Just paste the following URL in your profile readme and you are good to go.

**Pass your `username` in the URL**

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=Ashutosh00710)](https://github.com/ashutosh00710/github-readme-activity-graph)
```


### [Attention](#deploy-on-your-own-vercel-instance)

## Use themes

_`username=ashutosh00710&theme=theme_name`_

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=dracula)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

[Manual Customization](#customization) is also available

## Available Themes

|            Name            |                         Preview                         |
| :------------------------: | :-----------------------------------------------------: |
| **Default (cotton candy)** | <img src="./asset/default.svg" height=250 alt="graph"/> |
|        **dracula**         | <img src="./asset/dracula.svg" height=250 alt="graph"/> |
|        **gruvbox**         | <img src="./asset/gruvbox.svg" height=250 alt="graph"/> |
|         **rogue**          |  <img src="./asset/rogue.svg" height=250 alt="graph"/>  |
|         **github**         | <img src="./asset/github.svg" height=250 alt="graph"/>  |
|        **redical**         | <img src="./asset/redical.svg" height=250 alt="graph"/> |
|         **xcode**          |  <img src="./asset/xcode.svg" height=250 alt="graph"/>  |
|         **coral**          |  <img src="./asset/coral.svg" height=250 alt="graph"/>  |

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

## Deploy on your own Heroku instance

The GitHub API only allows limited requests per hour, my activity-graph.herokuapp.com/graph could possibly hit the rate limiter. If you host it on your own Heroku server, then you don't have to worry about anything.

You may use the server used by this project at <https://activity-graph.herokuapp.com> and pass in your username to access your graph.
E.g. `https://activity-graph.herokuapp.com/graph?username=<your_username>`

However, if there are a large number of requests or if the heroku account being used for the project runs out of dyno hours your graph will not load.

### Set up your server

1. Make a [Heroku](https://signup.heroku.com/) account.
2. Install the Heroku CLI
   - Mac: `brew install heroku/brew/heroku`
   - Ubuntu: `sudo snap install heroku --classic`
   - Windows: [Find the Windows installer here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
3. Clone the repository: `git clone https://github.com/Ashutosh00710/github-readme-activity-graph.git`
4. Navigate in to the directory: `cd github-readme-activity-graph`
5. Login to Heroku: `heroku login`
6. Create Heroku app: `heroku create` and copy the URL you are given as output.
7. Deploy app to heroku: `git push heroku main`
8. [Generate personal access token](https://github.com/settings/tokens). Copy your token.
9. Set token as heroku config var: `heroku config:set TOKEN=<your token goes here>`

Now just add the following to your profile readme and you're good to go.

```md
![Github Activity Graph](<url from step 6>/graph?username=<username>)
```

## Resources Used to build this project

|      Purpose       |  Library Name   |                   Link                    |
| :----------------: | :-------------: | :---------------------------------------: |
| Graph Construction | **CHARTISH.JS** | <https://github.com/gionkunz/chartist-js> |

</br>
<hr/>

### Made with ❤ and TypeScript 😉
