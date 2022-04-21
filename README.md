# Exceptionly Assessment

## Author

### Name: Andrei Strukau

### Email: karlikboroda@gmail.com

## Live Demo

- [Frontend](https://exceptionly-frontend.herokuapp.com/)

- [Backend Swagger UI](https://exceptionly-backend.herokuapp.com/api/)

## Description

### Frontend

  Created by using [Create React App](https://github.com/facebook/create-react-app) (CRA) _template_ with following libraries including:

  - React v17.0.2
  - Type Checker - TypeScript
  - API client - Axios
  - Sass
  - State management - Redux Thunk & Toolkit
  - Unit & Integration Test - Cypress
  - Format & Lint - ESLint & Prettier

  Custom Templates, format, and ESlint configurations.

### Backend

  Created by using [Nestjs](https://nestjs.com/) template with following libraries including:

  - Nest
  - bcrypt
  - mongodb
  - passport
  - typeorm
  - swagger-ui-express

## Setup Environments

- Node 16.13.0
- Yarn 1.22.17

### Start backend on local
```
npm run start:dev
```

### Start frontend on local
```
npm run start
```

## Run Scripts

Inside the project directory run:

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn test` - launches the test runner in the interactive watch mode.
- `yarn build` - builds the app for production to the `build` folder.
- `yarn eject` - exposes content of `react-script` package
- `yarn lint` - lints project files according to Airbnb — as part of their style guide 👍 — it provides an ESLint configuration that anyone can use and it is the standard.
- `yarn fix` - fix lint errors.
- `yarn format` - running prettier code cleaner.
- `yarn cypress:run` - run cypress integration test.
- `yarn cypress:run-ct` - run cypress component test.

## State Management

The code is set for [Redux Toolkit](https://medium.com/react-courses/instant-learn-react-redux-toolkit-with-a-simple-minimalistic-example-3c63c296ed65) you pick.

## Eslint configurations

Lint is set according to Airbnb style guide — as part of their style guide.

## Format configurations

[Prettier](https://prettier.io/) is set using my opinionated settings, feel free to [tweak prettier rules](https://prettier.io/docs/en/configuration.html) inside config file `.prettierrc` to match your code style.
