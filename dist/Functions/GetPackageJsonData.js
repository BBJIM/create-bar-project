"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerPackageJsonData = exports.getPackageJsonData = void 0;
const Common_1 = require("../Common");
exports.getPackageJsonData = ({ projectName, baseDepsKey, stateDepsKey, browsersListKey, }) => {
    return `{
		"name": "${projectName}",
		"version": "1.0.0",
		"license": "MIT",
		"private": true,
		"scripts": {
			${Common_1.clientScripts[baseDepsKey]}
		},
		"dependencies": {
			${Common_1.baseDependencies[baseDepsKey]}
			${Common_1.stateDependencies[stateDepsKey]}
		},
		"devDependencies": {
			${Common_1.devDependencies[baseDepsKey]}	
		}${browsersListKey ? ',\n' + Common_1.browserslistString : ''}
	}`;
};
exports.getServerPackageJsonData = ({ projectName, stateDepsKey, }) => {
    return `
	{
		"name": "${projectName}",
		"version": "1.0.0",
		"license": "MIT",
		"private": true,
		"scripts": {
			"start-node": "ts-node -r tsconfig-paths/register ./src/App",
			"start": "nodemon",
			"build": "rimraf ./dist && tsc",
			"serve": "node -r ./tsconfig-paths-bootstrap.js ./dist/App",
			"lint": "eslint src/**/*.{js,ts} --quiet --fix"
		},
		"dependencies": {
			${Common_1.serverDependencies[stateDepsKey]}
		},
		"devDependencies": {
			"@types/bcrypt": "^3.0.0",
			"@types/compression": "^1.7.0",
			"@types/cors": "^2.8.7",
			"@types/express": "^4.17.8",
			"@types/jsonwebtoken": "^8.5.0",
			"@types/mongoose": "^5.7.36",
			"@types/node": "^14.11.1",
			"@typescript-eslint/eslint-plugin": "^4.4.0",
			"@typescript-eslint/parser": "^4.4.0",
			"dotenv": "^8.2.0",
			"eslint": "^7.10.0",
			"eslint-config-prettier": "^6.12.0",
			"eslint-plugin-prettier": "^3.1.4",
			"husky": "^4.2.5",
			"lint-staged": "^8.1.7",
			"nodemon": "^2.0.4",
			"prettier": "^2.0.5",
			"rimraf": "^3.0.2",
			"ts-node": "^9.0.0",
			"tsconfig-paths": "^3.9.0",
			"typescript": "^4.1.2"
		},
		"nodemonConfig": {
			"ignore": [
				"**/*.test.ts",
				"**/*.spec.ts",
				".git",
				"node_modules"
			],
			"watch": [
				"src"
			],
			"exec": "yarn start-node",
			"ext": "ts"
		}
	}
	
	`;
};
