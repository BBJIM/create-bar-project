import inquirer from 'inquirer';
import {
	APOLLO,
	MOBX,
	MONOREPO,
	NEXT_JS,
	NORAML_REACT,
	NORMAL_AND_SERVER,
	NORMAL_STRUCTURE,
	WEBPACK_AND_SERVER,
	WEBPACK_STRUCTURE,
} from '../Common';

const inquirerFunctions = {
	getValidProjectName: () => {
		const questions = [
			{
				name: 'projectName',
				type: 'input',
				message: 'Enter your project name:',
				validate: (value: string) => {
					if (value.length) {
						return true;
					} else {
						return 'Please enter your project name.';
					}
				},
			},
		];
		return inquirer.prompt(questions);
	},
	setupProjectFolders: () => {
		const questions = [
			{
				type: 'list',
				name: 'framework',
				message: 'Select the "framework" you want to work with:',
				choices: [NORAML_REACT, NEXT_JS],
				default: 0,
			},
			{
				type: 'list',
				name: 'globalState',
				message: 'Select state managment to work with:',
				choices: [MOBX, APOLLO],
				default: 0,
			},
			{
				type: 'list',
				name: 'structure',
				message: 'Select the project structure:',
				// choices: [NORMAL_STRUCTURE, WEBPACK_STRUCTURE, NORMAL_AND_SERVER, WEBPACK_AND_SERVER, MONOREPO],
				choices: [NORMAL_STRUCTURE, NORMAL_AND_SERVER],
				default: 0,
			},
		];
		return inquirer.prompt(questions);
	},
};

export default inquirerFunctions;
