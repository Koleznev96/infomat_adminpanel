# smolensk-adminka

This monorepo using [Yarn Workspaces](https://yarnpkg.com/features/workspaces)

Structure:

```
infomat/
  package.json
  packages/
    core/
      package.json
    web/
      package.json
	uikit/
      package.json
```

**Web** project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Attention, yarn patches:

> When generating patches with `yarn patch`, check version of resolution added to root `package.json`, it should be the same as version in dependencies (with `^`, `~`, etc).

When the perfect-scrollbar or other patched dependencies (see `.yarn/patches` directory) changed don't forget to check that patches are applicable.
[yarn patch docs](https://yarnpkg.com/cli/patch)

Patch sources:

- [Fix for bindMouseScrollHandler](https://github.com/mdbootstrap/perfect-scrollbar/pull/969)
- [Fix for TypeError: null is not an object](https://github.com/mdbootstrap/perfect-scrollbar/issues/827)

### App setup

1. Please see [.env.example](packages/web/.env.example) for sample app settings. To apply settings, you'd need to copy `.env.example` to `.env.local`
   and start the server.

2. Install [yarn](https://yarnpkg.com/getting-started/install)

```
 npm install -g yarn
```

3. Install dependencies

```
yarn install
```

### `yarn web:start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn web:build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

#### `yarn upgrade-interactive`

Tool to upgrade outdated dependencies

#### `yarn dedupe`

Deduplicate packages

## Redux

### Reducers

Each state should be a [Map](https://immutable-js.github.io/immutable-js/docs/#/Map) with required fields

- entities - map of **unprocessed** entities with id as key and entity as value.
- entityIds - [list](https://immutable-js.github.io/immutable-js/docs/#/List) of entity ids
- isLoading - boolean value. It should be set to `true` on data request and to `false` on data receive.

Each reducer can process only own entity events.
In case when _Entity1_ reducer have to process event of _Entity2_ we should create [saga](https://redux-saga.js.org/)
for _Entity2_. This saga should be triggered by _Entity2_ event and dispatch new event for _Entity1_

Reducers shouldn't modify data before storing it in entities.

### Selectors

As agreed in discussions, there would be the following conventions for Selector functions in the project:

- Each _global_ selector should start with the `select` word, e.g. `selectSomeStateProperty`.
- Local selectors or combiners can be names as `selectSomeComponentState`.
- All selectors should be `camelCase`'d, e.g. should not start with the capital letter as it's just a function.
- **Do not select raw data from store** But use ViewModels instead.
  ([See](https://docs.google.com/drawings/d/1RgxKCAq5GJtEXciM8Fo6AcUwXo8pDHd-gRBnWIL9JHo/edit?usp=sharing) and update ViewModel dependencies)

Examples:

```javascript
// global selector, reused across components
const selectSessionLogin = createSelector(selectSessionState, (sessionState) => sessionState.get('login', '...'));

// local selector, container-specific
const selectLoginFormState = createSelector(selectLoginFormState, (form) => ({
	login: form.get('login', '...'),
	password: form.get('password', ''),
	error: form.get('error', ''),
}));
```
