import { baseDependencies, browserslistString, devDependencies, scripts, stateDependencies } from 'Common';

const createPackageJson = ({
	projectName,
	scriptsKey,
	baseDepsKey,
	stateDepsKey,
	browsersListKey,
}: {
	projectName: string;
	scriptsKey: string;
	baseDepsKey: string;
	stateDepsKey: string;
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
			${baseDependencies[baseDepsKey]}
			${stateDependencies[stateDepsKey]}
		},
		"devDependencies": {
			${devDependencies[baseDepsKey]}	
		}${browsersListKey ? ',\n' + browserslistString : ''}
	}`;
};

export default createPackageJson;
