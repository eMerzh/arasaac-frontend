<div align="center">
<p><strong>WIP!!!!!</strong></p>
  <img width=200 src="https://cdn.rawgit.com/juanda99/arasaac-frontend/master/app/components/Welcome/arasaac-logo.svg" alt="Arasaac logo" align="center" />
</div>
<br />

<div align="center"><strong>New Arasaac website</strong></div>
<div align="center">A highly scalable, single page app focus on performance and best practices</div>

<br />

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/juanda99/arasaac-frontend">
    <img src="https://david-dm.org/juanda99/arasaac-frontend.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/juanda99/arasaac-frontend#info=devDependencies">
    <img src="https://david-dm.org/juanda99/arasaac-frontend/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/juanda99/arasaac-frontend">
    <img src="https://travis-ci.org/juanda99/arasaac-frontend.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
    <a href='https://coveralls.io/github/juanda99/arasaac-frontend?branch=master'><img src='https://coveralls.io/repos/github/juanda99/arasaac-frontend/badge.svg?branch=master' alt='Coverage Status' /></a>
  <!-- Localization -->
  <a target="_blank" href="https://crowdin.com/project/arasaac"><img src="https://d322cqt584bo4o.cloudfront.net/arasaac/localized.svg"></a>

</div>

<br />

<div align="center">
  <sub>Made with ❤︎ by <a href="https://twitter.com/juandawrite">juanda</a> and <a href="https://github.com/juanda99/arasaac-frontend/graphs/contributors">contributors</a></sub>
</div>


## What is Arasaac
Arasaac is a website that offers ARASAAC graphic resources and materials to facilitate communication for those with some sort of problem in this area. [See current website](http://www.arasaac.org)

It's used  worldwide and everyday by thousands of users, so we decided to improve its usability and performance.[See new website, still in development](https://beta.arasaac.org)


## Demo
You can check our development status at https://beta.arasaac.org.


## Quick start

1. Clone this repo using `git clone https://github.com/juanda99/arasaac-frontend.git`
2. Run `npm install` or `yarn install` to install dependencies<br />
   *We auto-detect `yarn` for installing packages by default, if you wish to force `npm` usage do: `USE_YARN=false npm run setup`*<br />
3. Run `npm start` or `yarn start` to see the app running at `http://localhost:3000`.*
4. This app use some backend points:
  - *static.arasaac.org* for getting static data files (pictogram images, materials)
  - *api.arasaac.org* for getting json data from the server
  
  Our backend server is dockerized, you can install it locally: see [how to instal the backend server](https://github.com/juanda99/arasaac-docker) 

## Features and current status

- Pictograms
  - Search pictograms (Not started)
  - Download full catalog of pictos (Not started)

- Online Tools (Not started)

- Developers
  - API doc (WIP)

- Materials
  - Search materials (Almost ready)
  - Material view (Almost ready)
  - Upload materials (WIP)

- Users
  - User creations and login (WIP)
  - User roles (Not started)
  - Social logins (Not started)

- GUI Look and feel
  - Themes (WIP)
  - Tour guide (WIP)
  - General settings (WIP)

- Translations (WIP)



## Technical summary
<dl>
<dt>Boilerplate based on <a href="https://github.com/mxstbr/react-boilerplate">React boilerplate</a></dt>
  <dd>Using React, Redux, Immutable.js, Sagas and Reselect</dd>

  <dt>API with nodeJS and Express on the server side</dt>
  <dd>Swagger API framework for docs and MongoDB as database</dd>

  <dt>Presentation</dt>
  <dd>Material-ui</dd>

  <dt>Data</dt>
  <dd>MongoDB</dd>

  <dt>Crowdin</dt>
  <dd>For all the translations workflow</dd>

  <dt>Authentication</dt>
  <dd>JWT, user/password and social logins</dd>

</dl>

## License

This project is licensed under the MIT license, Copyright (c) 2016 . For more information see `LICENSE.md`.

## Supporters
<img src="http://arasaac.org/images/logoAragon.jpg" alt="Gobierno de Aragón" align="left" />
<img src="http://arasaac.org/images/logo_fse.jpg" alt="European Union" align="right" />


