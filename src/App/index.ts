import chalk from 'chalk';
import { functions } from '../Common';
import { clear } from 'console';
import figlet from 'figlet';
import { createFolderByName } from '../Functions/FsUtils';
import inquirerFunctions from '../Lib/inquirerSetupFunction';

clear();

console.log(chalk.yellow(figlet.textSync('Bar Base Project', { horizontalLayout: 'full' })));
console.log(`version - ${process.env.npm_package_version}\n`);

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
