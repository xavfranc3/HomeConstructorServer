
## Description

An app to help regular people manage the different aspects of a construction project: budgets, sharing and having a single source of truth for collaborators(spouses, foremen, ...), contacts, phases in the project..
One-liner: Construction Projects management for lay-people

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Some specific issues

Rxjs seems to run into a specific problem with NestJs 8, so just run the following if something pops up around rxjs:

```bash
npm i rxjs@^7
```


