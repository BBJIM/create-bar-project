import chalk from 'chalk';
import { functions } from '../Common';
import { clear } from 'console';
import figlet from 'figlet';
import { createFolderByName } from '../Functions';
import inquirerFunctions from '../Lib/inquirerSetupFunction';

clear();

/**
 * if you make a change:
 * need to yarn build, then delete node_modules,update package version
 * and then 'yarn out-bin'. after all that you can use it with cmd again.
 */

console.log(chalk.yellow(figlet.textSync('Bar Base Project', { horizontalLayout: 'full' })));
const run = async () => {
	try {
		const { getValidProjectName, setupProjectFolders } = inquirerFunctions;
		const { projectName } = await getValidProjectName();
		await createFolderByName(projectName);
		const result = await setupProjectFolders();
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
