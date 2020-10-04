import chalk from 'chalk';
import { functions } from 'Common';
import { clear } from 'console';
import figlet from 'figlet';
import { createFolder } from 'Functions';
import inquirerFunction from 'Lib/inquirerSetupFunction';

clear();

console.log(chalk.blue(figlet.textSync('Bar Base Project', { horizontalLayout: 'full' })));
const run = async () => {
	const { projectName } = await inquirerFunction.projectName();
	await createFolder(projectName);
	const result = await inquirerFunction.projectSetup();
	const keys: string[] = Object.values(result);
	for (const key of keys) {
		await functions[key](projectName);
	}
};

run();
