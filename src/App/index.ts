import chalk from 'chalk';
import { functions } from '../Common';
import { clear } from 'console';
import figlet from 'figlet';
import { createFolder } from '../Functions';
import inquirerFunction from '../Lib/inquirerSetupFunction';

clear();

/**
 * if you make a change:
 * need to yarn build, then delete node_modules,update package version
 * and then 'yarn out-bin'. after all that you can use it with cmd again.
 */

console.log(chalk.yellow(figlet.textSync('Bar Base Project', { horizontalLayout: 'full' })));
const run = async () => {
	try {
		const { projectName } = await inquirerFunction.projectName();
		await createFolder(projectName);
		const result = await inquirerFunction.projectSetup();
		const keys: string[] = Object.values(result);
		for (const key of keys) {
			await functions[key](projectName);
		}
		console.log(chalk.yellow(figlet.textSync('FINSHED!')));
	} catch (err) {
		console.error(err);
	}
};

run();
