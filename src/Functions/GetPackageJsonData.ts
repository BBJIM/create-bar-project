import { baseDependencies, browserslistString, devDependencies, scripts, stateDependencies } from 'Common';

const getPackageJsonData = ({
	projectName,
	baseDepsKey,
	stateDepsKey,
	browsersListKey,
}: {
	projectName: string;
	baseDepsKey: string;
	stateDepsKey: string;
	browsersListKey?: boolean;
}) => {
	return `{
		"name": "${projectName}",
		"version": "1.0.0",
		"license": "MIT",
		"private": true,
		"scripts": {
			${scripts[baseDepsKey]}
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

export default getPackageJsonData;
