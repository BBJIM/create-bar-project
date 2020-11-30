import chalk from 'chalk';
import { functions } from '../Common';
import { clear } from 'console';
import figlet from 'figlet';
import { createFolderByName } from '../Functions/FsUtils';
import inquirerFunctions from '../Lib/inquirerSetupFunction';

clear();

/**
 * if you make a change:
 * need to run `yarn out-bin`, then you can use it with the new version in the cmd.
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
