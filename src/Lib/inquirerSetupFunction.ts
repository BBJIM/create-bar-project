import inquirer from 'inquirer';

const inquirerFunction = {
	projectSetup: () => {
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
			{
				type: 'list',
				name: 'framework',
				message: 'Select the "framework" you want to work with:',
				choices: ['normal react', 'next.js'],
				default: 0,
			},
			{
				type: 'list',
				name: 'structure',
				message: 'Select the project structure:',
				choices: [
					'normal',
					'normal + another server folder project',
					'monorepo with the server and the client',
				],
				default: 0,
			},
			{
				type: 'list',
				name: 'globalState',
				message: 'Select state managment to work with:',
				choices: ['mobx', 'apollo js with graphQL'],
				default: 0,
			},
		];
		return inquirer.prompt(questions);
	},
};

export default inquirerFunction;
