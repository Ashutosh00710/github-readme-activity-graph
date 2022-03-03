<p align="center">
    <img src="asset/logo.svg" height="150">
</p>

<h1 align="center">Github Readme Activity Graph</h1>

<a href="https://jb.gg/OpenSourceSupport">
<p align="center">
    <img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg" height="150">
</p>
</a>
<h3 align="center"><a href="https://jb.gg/OpenSourceSupport">Supported by JetBrains</a></h3>
A dynamically generated activity graph to show your GitHub activities of last 31 days.

## Table of contents

- [Table of contents](#table-of-contents)
- [How to Use](#how-to-use)
  - [Attention ⚠](#attention-)
- [Use themes](#use-themes)
- [Available Themes](#available-themes)
- [Customization](#customization)
  - [Common Options](#common-options)
- [Deploy on your own Heroku instance](#deploy-on-your-own-heroku-instance)
  - [Step-by-step instructions for deploying to Heroku **(from UI)**](#step-by-step-instructions-for-deploying-to-heroku-from-ui)
  - [Step-by-step instructions for deploying to Heroku **(from CLI)**](#step-by-step-instructions-for-deploying-to-heroku-from-cli)
- [Contributing](#contributing)
- [Core Team 💻](#core-team-)
- [Contributors ✨](#contributors-)
- [Resources Used to build this project](#resources-used-to-build-this-project)
  - [Made with ❤ and TypeScript <img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" width="25">](#made-with--and-typescript-)

## How to Use

Just paste the following URL in your profile readme and you are good to go.

**Pass your `username` in the URL**

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=Ashutosh00710)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

### [Attention ⚠](#Deploy-on-your-own-heroku-instance)

## Use themes

_`username=ashutosh00710&theme=theme_name`_

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=Ashutosh00710&theme=dracula)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

[Manual Customization](#customization) is also available

## Available Themes

|            Name            |                          Preview                           |
| :------------------------: | :--------------------------------------------------------: |
| **Default (cotton candy)** |  <img src="./asset/default.svg" height=250 alt="graph"/>   |
|       **react-dark**       | <img src="./asset/react-dark.svg" height=250 alt="graph"/> |
|         **github**         |   <img src="./asset/github.svg" height=250 alt="graph"/>   |
|         **xcode**          |   <img src="./asset/xcode.svg" height=250 alt="graph"/>    |
|         **rogue**          |   <img src="./asset/rogue.svg" height=250 alt="graph"/>    |

For more themes click [here](https://github.com/Ashutosh00710/github-readme-activity-graph/blob/main/THEMES.md)

## Customization

Customize the appearance of your Activity Graph however you want with URL params.

#### Common Options

|   Arguments    |                  Description                  |       Type of Value        |
| :------------: | :-------------------------------------------: | :------------------------: |
|   `bg_color`   |            card's background color            |   hex code (without `#`)   |
|    `color`     |            graph card's text color            |   hex code (without `#`)   |
|     `line`     |              graph's line color               |   hex code (without `#`)   |
|    `point`     |         color of points on line graph         |   hex code (without `#`)   |
|  `area_color`  |       color of the area under the graph       |   hex code (without `#`)   |
|     `area`     |          shows area under the graph           | boolean (default: `false`) |
| `hide_border`  |   makes the border of the graph transparent   | boolean (default: `false`) |
|  `hide_title`  |       sets the title to an empty string       | boolean (default: `false`) |
| `custom_title` |          set the title to any string          |           string           |
|    `theme`     | name of [available themes](#available-themes) |           string           |

⚠ **For `custom_title` please make sure you are use %20 for spaces**

Example:

**`custom_title=This%20is%20a%20title`**

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=ashutosh00710&custom_title=This%20is%20a%20title&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

**Example:**

```md
[![Ashutosh's github activity graph](https://activity-graph.herokuapp.com/graph?username=ashutosh00710&bg_color=fffff0&color=708090&line=24292e&point=24292e&area=true&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

## Deploy on your own Heroku instance

The GitHub API only allows limited requests per hour, my activity-graph.herokuapp.com/graph could possibly hit the rate limiter. If you host it on your own Heroku server, then you don't have to worry about anything.

You may use the server used by this project at <https://activity-graph.herokuapp.com> and pass in your username to access your graph.
E.g. `https://activity-graph.herokuapp.com/graph?username=<your_username>`

However, if there are a large number of requests or if the heroku account being used for the project runs out of dyno hours your graph will not load.

### Step-by-step instructions for deploying to Heroku (from UI)

1. Sign in to Heroku or create a new account at <https://heroku.com>
2. Click the Deploy button below

<p align="center">
    <a href="https://heroku.com/deploy?template=https://github.com/Ashutosh00710/github-readme-activity-graph/main">
        <img src="https://www.herokucdn.com/deploy/button.svg" title="Deploy to Heroku" alt="Deploy"/>
    </a>
</p>

3. On the page that comes up, click "**Deploy App**" at the end of the form
4. Once the app is deployed, click "**Manage App**" to go to the dashboard
5. Visit the "**Settings**" tab and click "**Reveal Config Vars**"
6. Visit [this link](https://github.com/settings/tokens/new?description=GitHub%20Readme%20Activity%20Graph) to create a new Personal Access Token
7. Scroll to the bottom and click "**Generate token**"
8. Add the token as a Config Var with the key `TOKEN`

![TOKEN](./asset/token-config.png)

9. Scroll down to the Domains section to find the URL you will use in place of `activity-graph.herokuapp.com`

### Step-by-step instructions for deploying to Heroku (from CLI)

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

## Contributing

Please read through our [contributing guidelines](https://github.com/Ashutosh00710/github-readme-activity-graph/blob/main/CONTRIBUTING.md). Included are directions for opening issues, coding standards, and notes on development.

## Core Team 💻

<table>
    <tr>
        <td align="center">
        <a href="http://github.com/Ashutosh00710">
            <img src="https://avatars.githubusercontent.com/u/42907572?s=460&u=3c5c03fdddeec2483819b845bd549616d48b71e5&v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Ashutosh Dwivedi</b></sub>
        </a>
        <br />
        <a href="#projectManagement" title="Project Management">📆</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=ashutosh00710" title="Code">💻</a>
        <a href="#documentation" title="Documentation">📖</a>
        <a href="#ideas" title="Ideas & Planning">🤔</a>
        <a href="#testing" title="Testing">⚠</a>
    </td>
    <td align="center">
        <a href="http://github.com/kshitij978">
            <img src="https://avatars.githubusercontent.com/u/42491256?s=460&u=db0c5e26632c9f4917db50e714cd7552c1559ba8&v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Kshitij Srivastava</b></sub>
        </a>
        <br />
        <a href="#projectManagement" title="Project Management">📆</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=kshitij978" title="Code">💻</a>
        <a href="#documentation" title="Documentation">📖</a>
        <a href="#design" title="Design">🎨</a>
    </td>
    </tr>
</table>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
        <a href="https://github.com/tintindas">
            <img src="https://avatars.githubusercontent.com/u/47525983?s=460&u=0cedda5548e62fc342f32f89d230253cb8b9b099&v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Upamanyu Das</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=tintindas" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/DenverCoder1">
            <img src="https://avatars.githubusercontent.com/u/20955511?s=460&u=5bbdbfe0199b05d6ca913fb799236c8beedcd192&v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Jonah Lawrence</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=DenverCoder1" title="Code">💻</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=DenverCoder1" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/MilindModi">
            <img src="https://avatars.githubusercontent.com/u/28483876?s=460&v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Milind Modi</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=MilindModi" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/Vaibhav-afk">
            <img src="https://avatars.githubusercontent.com/u/67143938?s=400&u=96dcbfcff0afcd5597a904181bc4cc309a4b22fa&v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Vaibhav</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=Vaibhav-afk" title="Code">💻</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=Vaibhav-afk" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/jgphilpott">
            <img src="https://avatars.githubusercontent.com/u/4128208?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Jacob Philpott</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=jgphilpott" title="Code">💻</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=jgphilpott" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/SonuKumar81800">
            <img src="https://avatars.githubusercontent.com/u/45717030?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Sonu Kumar</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=SonuKumar81800" title="Style">🎨</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=SonuKumar81800" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/andinoriel">
            <img src="https://avatars.githubusercontent.com/u/36269798?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Mykola Symon</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=andinoriel" title="Code">💻</a>
    </td>
  </tr>
  <tr>
    <td align="center">
        <a href="https://github.com/sreyan-ghosh">
            <img src="https://avatars.githubusercontent.com/u/60854658?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Sreyan Ghosh</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=sreyan-ghosh" title="Style">🎨</a>
    </td>
    <td align="center">
        <a href="https://github.com/Anant-mishra1729">
            <img src="https://avatars.githubusercontent.com/u/84588156?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Anant Mishra</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=Anant-mishra1729" title="Style">🎨</a>
    </td>
    <td align="center">
        <a href="https://github.com/SKewLinez">
            <img src="https://avatars.githubusercontent.com/u/37243931?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Skyler</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=SKewLinez" title="Style">🎨</a>
    </td>
    <td align="center">
        <a href="https://github.com/eliely">
            <img src="https://avatars.githubusercontent.com/u/16717633?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Iryna Mykoliuk</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=eliely" title="Style">🎨</a>
    </td>
    <td align="center">
        <a href="https://github.com/DalpatRathore">
            <img src="https://avatars.githubusercontent.com/u/69510006?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Dalpat Rathore</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=DalpatRathore" title="Style">🎨</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=DalpatRathore" title="Code">💻</a>
    </td>
    <td align="center">
        <a href="https://github.com/fishmandev">
            <img src="https://avatars.githubusercontent.com/u/29619660?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>Dmitriy Fishman</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=fishmandev" title="Documentation">📖</a>
    </td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Resources Used to build this project

|      Purpose       |  Library Name   |                   Link                    |
| :----------------: | :-------------: | :---------------------------------------: |
| Graph Construction | **CHARTIST.JS** | <https://github.com/gionkunz/chartist-js> |

</br>
<hr/>

### Made with ❤ and TypeScript <img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" width="25">
