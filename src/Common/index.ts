import { apollo, mobx, monorepo, nextJs, normalReact, normalStructure, normalWithServer, webpack } from '../Functions';

export const NORAML_REACT = 'create react app';
export const NEXT_JS = 'next.js';
export const NORMAL_STRUCTURE = 'only client';
export const WEBPACK = 'webpack';
export const NORMAL_AND_SERVER = 'client + another server folder project';
export const MONOREPO = 'monorepo with the server and the client - not finished completely yet';
export const MOBX = 'mobx';
export const APOLLO = 'apollo with graphQL';

export const functions = {
	[NORAML_REACT]: normalReact,
	[NEXT_JS]: nextJs,
	[WEBPACK]: webpack,
	[MOBX]: mobx,
	[APOLLO]: apollo,
	[NORMAL_STRUCTURE]: normalStructure,
	[NORMAL_AND_SERVER]: normalWithServer,
	[MONOREPO]: monorepo,
};

export const reactKey = 'React';
export const nextKey = 'Next';
export const webpackKey = 'Webpack';
export const apolloKey = 'Apollo';
export const mobxKey = 'Mobx';

const commonClientDeps = `
"chart.js": "^2.9.3",
"cogo-toast": "^4.2.3",
"formik": "^2.1.5",
"js-cookie": "^2.2.1",
"react": "^17.0.1",
"react-app-polyfill": "^1.0.6",
"react-chartjs-2": "^2.10.0",
"react-dom": "^17.0.1",
"react-icons": "^3.10.0",
"react-lazy-load-image-component": "^1.5.0",
"react-loader-spinner": "^3.1.14",
"react-spring": "^8.0.27",
"react-swipeable": "^5.5.1",
"react-table": "^7.5.2",
"smoothscroll-polyfill": "^0.4.4",
"styled-components": "^5.1.1",
"yup": "^0.29.3",
`;

const webpackDeps = `
	${commonClientDeps}
	"react-router": "^5.2.0",
	"react-router-dom": "^5.2.0",
	"react-router-hash-link": "^2.0.0",
`;

const commonClientDevDeps = `
"@storybook/addon-essentials": "^6.1.1",
"@storybook/addon-links": "^6.1.1",
"@storybook/cli": "^6.1.1",
"@storybook/react": "^6.1.1",
"@types/chart.js": "^2.9.24",
"@types/js-cookie": "^2.2.6",
"@types/node": "^12.0.0",
"@types/react": "^16.9.52",
"@types/react-dom": "^16.9.8",
"@types/react-lazy-load-image-component": "^1.5.1",
"@types/react-loader-spinner": "^3.1.0",
"@types/react-table": "^7.0.24",
"@types/smoothscroll-polyfill": "^0.3.1",
"@types/styled-components": "^5.1.0",
"@types/yup": "^0.29.6",
"@typescript-eslint/eslint-plugin": "^4.4.1",
"@typescript-eslint/parser": "^4.4.1",
"babel-loader": "^8.2.1",
"cross-env": "^7.0.2",
"eslint-config-prettier": "^6.12.0",
"eslint-plugin-md": "^1.0.19",
"eslint-plugin-prettier": "^3.1.4",
"eslint-plugin-react": "^7.21.4",
"husky": "^4.2.5",
"lint-staged": "^8.1.7",
"prettier": "^2.0.5",
"storybook-addon-styled-component-theme": "^1.3.0",
"typescript": "^4.1.2"
`;

export const clientScripts = {
	[reactKey]: `
	"start": "cross-env APP_ENV=development BROWSER=none react-scripts start",
	"build": "cross-env APP_ENV=production react-scripts build",
	"serve": "serve -s build",
	"eject": "react-scripts eject",
	"lint": "eslint src/**/*.{js,jsx,ts,tsx} --quiet --fix",
	"storybook": "start-storybook -p 6006 -s public",
	"build-storybook": "build-storybook -s public"
	`,
	[nextKey]: `
	"start": "next -p 3000",
	"build": "next build",
	"serve": "next start -p 5000",
	"lint": "eslint src/**/*.{js,jsx,ts,tsx} --quiet --fix",
	"storybook": "start-storybook -p 6006 -s public",
	"build-storybook": "build-storybook -s public"
	`,
	[webpackKey]: `
	"start": "cross-env NODE_ENV=development webpack serve",
	"build": "cross-env NODE_ENV=production webpack  --progress",
	"serve": "node scripts/serve.js",
	"lint": "eslint src/**/*.{js,jsx,ts,tsx} --quiet --fix",
	"storybook": "start-storybook -p 6006 -s assets",
	"build-storybook": "build-storybook -s assets"
	`,
};

export const baseDependencies = {
	[reactKey]: `
		${webpackDeps}
		"react-scripts": "^3.4.1",
	`,
	[nextKey]: `
	${commonClientDeps}
    "next": "10.0.3",
    "next-cookies": "^2.0.3",
    "react-is": "^16.8.0",
	`,
	[webpackKey]: webpackDeps,
};

export const stateDependencies = {
	[mobxKey]: `
	"axios": "^0.21.2",
	"mobx": "4.14.1",
	"mobx-react": "6.1.4"
	`,
	[apolloKey]: `
	"@apollo/client": "^3.2.5",
	"graphql": "^15.4.0"
	`,
};

export const devDependencies = {
	[reactKey]: `
	${commonClientDevDeps}
	,"@babel/core": "^7.11.6",
	"@storybook/preset-create-react-app": "^3.1.4",
	"@types/react-router": "^5.1.7",
    "@types/react-router-dom": "^5.1.5",
    "@types/react-router-hash-link": "^1.2.1"
	`,
	[nextKey]: `
	${commonClientDevDeps}
	,"@babel/plugin-proposal-decorators": "^7.12.1",
	"@babel/preset-env": "^7.12.1",
	"babel-plugin-styled-components": "^1.8.0",
	"eslint": "^7.11.0"
	`,
	[webpackKey]: `
	${commonClientDevDeps}
	,"@babel/core": "^7.11.6",
    "@babel/plugin-proposal-class-properties": "^7.12.1",
    "@babel/plugin-proposal-decorators": "^7.12.1",
    "@babel/plugin-transform-runtime": "^7.11.5",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "@babel/preset-typescript": "^7.10.4",
	"@babel/runtime": "^7.11.2",
	"@types/clean-webpack-plugin": "^0.1.3",
    "@types/copy-webpack-plugin": "^6.2.0",
    "@types/dotenv-webpack": "^5.0.0",
	"@types/fork-ts-checker-webpack-plugin": "^0.4.5",
	"@types/react-router": "^5.1.7",
    "@types/react-router-dom": "^5.1.5",
	"@types/react-router-hash-link": "^1.2.1",
	"@types/webpack": "^4.41.22",
	"@types/webpack-dev-server": "^3.11.0",
	"babel-plugin-styled-components": "^1.11.1",
    "clean-webpack-plugin": "^3.0.0",
	"copy-webpack-plugin": "^6.2.1",
	"css-loader": "^5.0.1",
    "dotenv-webpack": "^5.1.0",
	"eslint": "^7.13.0",
	"eslint-plugin-react-hooks": "^4.1.2",
    "express": "^4.17.1",
    "fork-ts-checker-webpack-plugin": "^5.2.0",
	"html-webpack-plugin": "5.0.0-alpha.3",
	"style-loader": "^2.0.0",
    "ts-node": "^9.0.0",
	"tsconfig-paths-webpack-plugin": "^3.3.0",
	"url-loader": "^4.1.1",
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0",
    "webpack-dev-server": "^3.11.0"
	`,
};

export const browserslistString = `"browserslist": {
	"production": [
		">0.2%",
		"not dead",
		"not op_mini all"
	],
	"development": [
		"ie 11",
		"last 1 chrome version",
		"last 1 firefox version",
		"last 1 safari version"
	]
}`;

export const clientGitIgnoreData = `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules/
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
build/
dist/

# stroybook
stroybook-static/

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local
`;

const mobxServerDeps = `
"bcrypt": "^5.0.0",
"body-parser": "^1.19.0",
"compression": "^1.7.4",
"cors": "^2.8.5",
"express": "^4.17.1",
"helmet": "^4.1.1",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.10.6"
`;

export const serverDependencies = {
	[mobxKey]: `
		${mobxServerDeps}
	`,
	[apolloKey]: `
	${mobxServerDeps},
	"apollo-server-express": "^2.18.2",
	"graphql": "^15.3.0",
	"graphql-compose": "^7.22.1",
	"graphql-compose-mongoose": "^9.0.0"
	`,
};

export const serverGitIgnoreData = `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules/
/.pnp
.pnp.js

# testing
/coverage

# config
Config/
.env

# production
build/
dist/

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local
`;

export const serverEnvData = `
PORT=3005
NODE_ENV=development
`;
