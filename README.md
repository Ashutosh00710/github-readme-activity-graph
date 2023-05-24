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

### ⚠️ NOTICE: DEPLOYMENT MOVED ⚠️

The deployment of this project is moved from `https://activity-graph.herokuapp.com` domain to `https://github-readme-activity-graph.cyclic.app`. In case `https://github-readme-activity-graph.cyclic.app` doesn't work try with `https://github-readme-activity-graph.vercel.app` for more details, refer [this](https://github.com/Ashutosh00710/github-readme-activity-graph/issues/197#issuecomment-1560633754)

Please refer to the updated link [here](#how-to-use)

## Table of contents

-   [Table of contents](#table-of-contents)
-   [How to Use](#how-to-use)
    -   [Attention ⚠](#attention-)
-   [Use themes](#use-themes)
-   [Available Themes](#available-themes)
-   [Customization](#customization)
    -   [Common Options](#common-options)
-   [Deploy on your own Replit instance](#deploy-on-your-own-replit-instance)
    -   [Follow the steps](#follow-the-steps)
-   [Deploy on your own Vercel instance](#deploy-on-your-own-vercel-instance)
    -   [First Method](#first-method)
    -   [Second Method](#second-method)
    -   [Finally](#finally)
-   [Contributing](#contributing)
-   [Core Team 💻](#core-team-)
-   [Contributors ✨](#contributors-)
-   [Resources Used to build this project](#resources-used-to-build-this-project)
-   [Star History](#star-history)
    -   [Made with ❤ and TypeScript ](#made-with--and-typescript-)

## How to Use

Just paste the following URL in your profile readme and you are good to go.

**Pass your `username` in the URL**

```md
[![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=Ashutosh00710)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

### [Attention ⚠](#Deploy-on-your-own-heroku-instance)

## Use themes

_`username=ashutosh00710&theme=theme_name`_

```md
[![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=Ashutosh00710&theme=dracula)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

[Manual Customization](#customization) is also available

## Available Themes

|            Name            |                            Preview                             |
| :------------------------: | :------------------------------------------------------------: |
| **Default (cotton candy)** |    <img src="./asset/default.svg" height=250 alt="graph"/>     |
|         **react**          |     <img src="./asset/react.png" height=250 alt="graph"/>      |
|       **react-dark**       |   <img src="./asset/react-dark.svg" height=250 alt="graph"/>   |
|         **github**         |     <img src="./asset/github.svg" height=250 alt="graph"/>     |
|     **github-compact**     | <img src="./asset/github-compact.svg" height=250 alt="graph"/> |
|         **xcode**          |     <img src="./asset/xcode.svg" height=250 alt="graph"/>      |
|         **rogue**          |     <img src="./asset/rogue.svg" height=250 alt="graph"/>      |
|         **merko**          |     <img src="./asset/merko.png" height=250 alt="graph"/>      |
|          **vue**           |      <img src="./asset/vue.png" height=250 alt="graph"/>       |
|      **tokyo-night**       |  <img src="./asset/tokyo-night.png" height=250 alt="graph"/>   |
|     **high-contrast**      | <img src="./asset/high-contrast.png" height=250 alt="graph"/>  |

For more themes click [here](https://github.com/Ashutosh00710/github-readme-activity-graph/blob/main/THEMES.md)

## Customization

Customize the appearance of your Activity Graph however you want with URL params.

#### Common Options

|   Arguments    |                  Description                  |       Type of Value        |
| :------------: | :-------------------------------------------: | :------------------------: |
|   `bg_color`   |            card's background color            |   hex code (without `#`)   |
|    `color`     |            graph card's text color            |   hex code (without `#`)   |
| `title_color`  |           graph card's title color            |   hex code (without `#`)   |
|     `line`     |              graph's line color               |   hex code (without `#`)   |
|    `point`     |         color of points on line graph         |   hex code (without `#`)   |
|  `area_color`  |       color of the area under the graph       |   hex code (without `#`)   |
|     `area`     |          shows area under the graph           | boolean (default: `false`) |
| `hide_border`  |   makes the border of the graph transparent   | boolean (default: `false`) |
|  `hide_title`  |       sets the title to an empty string       | boolean (default: `false`) |
| `custom_title` |          set the title to any string          |           string           |
|    `theme`     | name of [available themes](#available-themes) |           string           |
|    `radius`    |            border radius of graph             |  number (0-16 inclusive)   |
|    `height`    |              height of the graph              | number (200-600 inclusive) |

⚠ **For `custom_title` please make sure that you are using %20 for spaces**

Example:

**`custom_title=This%20is%20a%20title`**

```md
[![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=ashutosh00710&custom_title=This%20is%20a%20title&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

**Example:**

```md
[![Ashutosh's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=ashutosh00710&bg_color=fffff0&color=708090&line=24292e&point=24292e&area=true&hide_border=true)](https://github.com/ashutosh00710/github-readme-activity-graph)
```

## Deploy on your own Replit instance

<details>
<summary><b>Step-by-step instructions for deploying to Replit (from UI)</b></summary>

#### Follow the steps

1. Sign in to Replit or create a new account at https://replit.com
2. Click the Deploy button below

 <a href="https://repl.it/github/Ashutosh00710/github-readme-activity-graph">
   <img alt="Run on Repl.it" src="https://repl.it/badge/github/Ashutosh00710/github-readme-activity-graph" style="height: 40px; width: 190px;" />
 </a>

3. On the page that comes up, choose language as `Node.js` and then click `Import from GitHub` Button

    ![Replit](./asset/replit1.png)

4. Visit [this link](https://github.com/settings/tokens/new?description=GitHub%20Readme%20Activity%20Graph) to create a new Personal Access Token
5. Scroll to the bottom and click "**Generate token**"
6. Wait clone done and add `Secrets` with your `Github token`

    ![Secrets](./asset/replit2.png)

7. Click the green `RUN` button on top, the console will run and at last the url will shows on the right
8. Now just add the following to your profile readme and you're good to go

```
![Github Activity Graph](<url from step 5>/graph?username=<username>)
```

</details>

## Deploy on your own Vercel instance

<details>
<summary><b>Step-by-step instructions for deploying to Vercel (from UI)</b></summary>

#### First Method

1.  Go to [vercel.com](https://vercel.com/).
2.  Click on `Log in`.
    ![image](https://user-images.githubusercontent.com/3431285/235332307-a98adccf-ac8e-4c05-8fae-b14e7d0b81e8.png)
3.  Sign in with GitHub by pressing `Continue with GitHub`.
    ![image](https://user-images.githubusercontent.com/3431285/235332299-70f52a0f-ffb9-4070-ae85-a4646a2bb1bf.png)
4.  Sign in to GitHub and allow access to all repositories if prompted.
5.  Fork this repo.
6.  Go back to your [Vercel dashboard](https://vercel.com/dashboard).
7.  To import a project, click the `Add New...` button and select the `Project` option.
    ![image](https://user-images.githubusercontent.com/3431285/235332320-d80e62c9-a7d9-45f3-8bef-b8950c4c9093.png)
8.  Click the `Continue with GitHub` button, search for the required Git Repository and import it by clicking the `Import` button.
    ![image](https://user-images.githubusercontent.com/3431285/235332373-3f28309c-d70b-490e-aa40-4d55ad429d5a.png)
9.  Create a personal access token (PAT) [here](https://github.com/settings/tokens/new) and enable the `repo` permissions (this allows access to see private repo stats).
    ![image](https://user-images.githubusercontent.com/3431285/235332420-df83a424-009b-4f69-bbb2-54e807bff701.png)
10. Add the PAT as an environment variable named `TOKEN`.
    ![image](https://user-images.githubusercontent.com/3431285/235332471-6915abf8-04fe-4f5e-b734-191388a77140.png)
11. Click deploy, and you're good to go. See your domains to use the API!

#### Second Method

Alternatively, click the button below and follow the instructions.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Ashutosh00710/github-readme-activity-graph)

After the deployment is complete:

1. Click the `Continue to Dashboard` button
   ![image](https://user-images.githubusercontent.com/3431285/235332677-addafd5f-dce8-4823-9927-05657eec2084.png)
2. In the `Settings` tab, click on `Environment Variables` and follow steps `9.` and `10.` of `First Method`.
   ![image](https://user-images.githubusercontent.com/3431285/235332731-03207969-b16e-42e4-858a-67b05af7bcc8.png)
3. Go to `Deployments` tab and redeploy the project.
   ![image](https://user-images.githubusercontent.com/3431285/235332761-1d3ae9c5-0138-447f-a41a-601c73ef3104.png)

#### Finally

Now just add the following to your profile readme and you're good to go.

```md
![Github Activity Graph](<{your_own_domain_name}.vercel.app>/graph?username=<username>)
```

</details>

## Contributing

Please read through our [contributing guidelines](https://github.com/Ashutosh00710/github-readme-activity-graph/blob/main/CONTRIBUTING.md). Directions are included for opening issues, coding standards, and notes on development.

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
    <td align="center">
        <a href="https://github.com/MagicLike">
            <img src="https://avatars.githubusercontent.com/u/82117109?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>MagicLike</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=MagicLike" title="Style">🎨</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=MagicLike" title="Code">💻</a>
    </td>
  </tr>
  </tr>
    <td align="center">
        <a href="https://github.com/OnkarRuikar">
            <img src="https://avatars.githubusercontent.com/u/87750369?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>OnkarRuikar</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=OnkarRuikar" title="Code">💻</a>
    </td>
    <td align="center">
        <a href="https://github.com/valetzx">
            <img src="https://avatars.githubusercontent.com/u/45054400?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>valetzx</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=valetzx" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/tranthaituananh">
            <img src="https://avatars.githubusercontent.com/u/77098480?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>tranthaituananh</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=tranthaituananh" title="Style">🎨</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=tranthaituananh" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/polekstulod">
            <img src="https://avatars.githubusercontent.com/u/38794173?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>polekstulod</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=polekstulod" title="Documentation">📖</a>
    </td>
    <td align="center">
        <a href="https://github.com/jmloudis">
            <img src="https://avatars.githubusercontent.com/u/70452698?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>jmloudis</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/pulls?q=author%3Ajmloudis+" title="Code">💻</a>
    </td>
    <td align="center">
        <a href="https://github.com/fabianocouto">
            <img src="https://avatars.githubusercontent.com/u/3431285?v=4" width="100px;" alt=""/>
            <br />
            <sub><b>fabianocouto</b></sub>
        </a>
        <br />
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=fabianocouto" title="Code">💻</a>
        <a href="https://github.com/Ashutosh00710/github-readme-activity-graph/commits?author=fabianocouto" title="Documentation">📖</a>
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

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Ashutosh00710/github-readme-activity-graph&type=Timeline)](https://star-history.com/#Ashutosh00710/github-readme-activity-graph&Timeline)

### Made with ❤ and TypeScript <img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" width="25">
