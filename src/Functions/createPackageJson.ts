const scripts = {
	React: ``,
	Next: ``,
	Webpack: ``,
};

const dependencies = {
	React: ``,
	Next: ``,
	Webpack: ``,
};

const devDependencies = {
	React: ``,
	Next: ``,
	Webpack: ``,
};

const browserslistString = `"browserslist": {
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

const createPackageJson = ({
	projectName,
	scriptsKey,
	depsKey,
	devDepsKey,
	browsersListKey,
}: {
	projectName: string;
	scriptsKey: string;
	depsKey: string;
	devDepsKey: string;
	browsersListKey?: boolean;
}) => {
	return `{
		"name": "${projectName},
		"version": "1.0.0",
		"license": "MIT",
		"private": true,
		"scripts": {
			${scripts[scriptsKey]}
		},
		"dependencies": {
			${dependencies[depsKey]}
		},
		"devDependencies": {
			${devDependencies[devDepsKey]}	
		}${browsersListKey ? ',\n' + browserslistString : ''}
	}`;
};

export default createPackageJson;
