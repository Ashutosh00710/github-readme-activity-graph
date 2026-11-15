# Contributing to Github Readme Activity Graph

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Before you contribute

Our aim is to **keep it simple** for the developers to contribute to this project. See the folder structure (with concise description)

## How to contribute

1. First up you need to fork (make a copy) of this repo to your Github account.

2. Clone (download) your fork to your computer

3. Set your streams so you can sync your clone with the original repo (get the latest updates)

   - `git remote add upstream https://github.com/Ashutosh00710/github-readme-activity-graph`
   - `git pull upstream main`
   - The above 2 commands will synchronize your forked version of the project with the actual repository.

4. Create a branch `git checkout -b <your_branch_name>`.

5. [Generate your personal access token](https://github.com/settings/tokens)

6. Create a `.env` file in the root directory and in there write  
   `TOKEN=<your_generated_token>`

   Now, open your terminal and write the following commands:

   - `npm install` (install the dependencies)
   - `npm run dev:start` (run the Express server on `http://localhost:5100`, reloads on changes)
   - or `npm run cf:dev` (run it as a Cloudflare Worker on `http://localhost:8787`, same as production)

   Then open `/graph?username=<your_username>` to see the graph.

   Before you open a pull request, make sure these pass:

   - `npm test` (tests; they don't need a token or network access)
   - `npx tsc --noEmit` (type check)
   - `npm run format` (formats the code with Prettier)

7. Get a screenshot of your finished work! (if there are any UI changes) Try to crop it so that it looks good as a smallish (preferably squarish) image.

8. Pull from the upstream again before you commit your changes as you did in step 3. This is to ensure you still have the latest code.

9. If you see an error like

   ```md
   Your local changes to the following files would be overwritten by merge. Please commit your changes or stash them before you merge
   ```

   on using `git pull upstream main` use:

   - `git stash`
   - `git pull upstream main`
   - `git stash pop`

   for more info on this [visit](https://bluecast.tech/blog/git-stash/)

10. Commit and push the code to your fork

11. Create a pull request to have the changes merged from your fork into the origin.

### Folder Structure

```

├── ...
├── .github
│ ├── ISSUE_TEMPLATE                 #issue templates
│ ├── workflows                      #CI (tests on every push and pull request)
│ └── PULL_REQUEST_TEMPLATE.md
├── __test__                         #tests for the project (Jest)
│ ├── __snapshots__                  #saved SVG output used by snapshot tests
│ ├── utils.test.ts                  #tests for src/utils.ts, the chart renderer and the /graph route
│ ├── svgs.test.ts                   #tests for src/svgs.ts and src/GraphCards.ts
│ ├── themes.test.ts                 #tests for src/styles/themes.ts
│ ├── fetching.test.ts               #tests for src/fetcher.ts
│ ├── mockFunctions.ts               #mock GitHub API responses for fetching.test.ts
│ └── fakeInputs.ts                  #fake inputs for tests
├── asset                            #logo and screenshots of graphs
├── src
│ ├── interfaces
│ │ └── interface.ts                 #all interfaces used throughout the code
│ ├── styles
│ │ ├── graphAnimation.ts            #animations of the graph
│ │ ├── graphStyle.ts                #style (CSS) of the graph
│ │ └── themes.ts                    #all the themes are here
│ ├── createChart.ts                 #renders the line chart as plain SVG (no DOM needed)
│ ├── fetcher.ts                     #fetches contributions from GitHub's GraphQL API
│ ├── GraphCards.ts                  #class of Graph Cards
│ ├── handlers.ts                    #Express route handlers
│ ├── main.ts                        #Express server entry point (Node)
│ ├── worker.ts                      #Cloudflare Worker entry point (production)
│ ├── svgs.ts                        #svgs used or created throughout the project
│ └── utils.ts                       #query options, colors and graph building
├── index.html, script.js, styles.css  #website with the link generator
├── wrangler.jsonc                   #Cloudflare Worker configuration
├── ...

```

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If your change needs an explanation to the user, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](../../issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](../../issues); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give a sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports. I'm not even kidding.

## Use a Consistent Coding Style

Observe the coding style of the project and add your code also in the same style.
**Don't make major changes** (Like changing the complete folder structure)

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
