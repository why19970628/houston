## jest-puppeteer

jest-puppeteer e2e test
## Switch Env

`yarn use`

you need to make sure you are in the correct env.
## Install packages and submodules

- `yarn install` will install all the necessary packages defined in package.json

- Install Submodules:

  Make sure you have your local SSH key generated and added to github: [Adding a new SSH key to your GitHub account](https://help.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)

  ```
  git submodule init
  git submodule update
  ```

## Start Development

- `yarn e2e` will start all the necessary services.

