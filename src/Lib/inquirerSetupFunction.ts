import inquirer from 'inquirer';

const inquirerFunction = {
	projectSetup: () => {
		const questions = [
			{
				name: 'projectName',
				type: 'input',
				message: 'Enter your project name:',
				validate: function (value) {
					if (value.length) {
						return true;
					} else {
						return 'Please enter your project name.';
					}
				},
			},
			{
				type: 'checkbox',
				name: 'framework',
				message: 'Select the "framework" you want to work with:',
				choices: ['normal react', 'next.js'],
				default: ['normal react'],
			},
			{
				type: 'checkbox',
				name: 'structure',
				message: 'Select the project structure:',
				choices: [
					'normal',
					'normal + another server folder project',
					'monorepo with the server and the client',
				],
				default: ['normal'],
			},
			{
				type: 'checkbox',
				name: 'globalState',
				message: 'Select state managment to work with:',
				choices: ['mobx', 'apollo js with graphQL'],
				default: ['mobx'],
			},
		];
		return inquirer.prompt(questions);
	},
};

export default inquirerFunction;
