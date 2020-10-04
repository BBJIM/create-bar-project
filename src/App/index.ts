import chalk from 'chalk';
import { functions } from 'Common';
import { clear } from 'console';
import figlet from 'figlet';
import inquirerFunction from 'Lib/inquirerSetupFunction';

clear();

console.log(chalk.blue(figlet.textSync('Bar Base Project', { horizontalLayout: 'full' })));
const run = async () => {
	const { projectName } = await inquirerFunction.projectName();
	const result = await inquirerFunction.projectSetup();
	Object.values(result).forEach((value: string) => {
		functions[value]();
	});
	console.log(`Project Name: ${projectName}`);
};

run();
