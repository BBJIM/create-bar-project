import chalk from 'chalk';
import { clear } from 'console';
import figlet from 'figlet';
import inquirerFunction from 'Lib/inquirerSetupFunction';

clear();

console.log(chalk.blue(figlet.textSync('Bar Base Project', { horizontalLayout: 'full' })));
const run = async () => {
	const result = await inquirerFunction.projectSetup();
	console.log(result);
};

run();
