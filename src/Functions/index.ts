import { apolloKey, mobxKey, nextKey, reactKey, webpackKey } from 'Common';
import fs from 'fs';
import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';
import getPackageJsonData from './GetPackageJsonData';

let resources = '';
const root = process.cwd();

const projectProps = {
	base: '',
	state: '',
};

const promiseNcp = util.promisify(ncp);
const promiseRimraf = util.promisify(rimraf);

export const createFolderByName = async (name: string) => {
	try {
		resources = __dirname.replace('Functions', 'Resources');
		await mkdirp(`${root}/${name}`);
		console.log(`created folder - ${name}`);
	} catch (err) {
		throw new Error(`createFolderByName - ${err.message || err}`);
	}
};

const checkIfFolderExists = (path: string) => {
	return fs.existsSync(path);
};

const copyFolders = async (source: string, destination: string, callingFunctionName: string) => {
	try {
		if (checkIfFolderExists(source)) {
			return promiseNcp(source, destination, { stopOnErr: true });
		} else {
			console.log(`copyFolders - ${callingFunctionName} - folder - ${source}, didnt exist, didnt copy`);
		}
	} catch (err) {
		throw new Error(`copyFolders - ${callingFunctionName} ${err.message || err}`);
	}
};

const deleteFolder = async (source: string, callingFunctionName: string) => {
	try {
		return promiseRimraf(source);
	} catch (err) {
		throw new Error(`deleteFolder - ${callingFunctionName} ${err.message || err}`);
	}
};

const copyProjectCommonFolders = async (projectName: string, commonFolderName: string) => {
	try {
		copyFolders(`${resources}/Clients/Common/${commonFolderName}`, `${root}/${projectName}`, 'sharedFolders');
	} catch (err) {
		throw new Error(`sharedFolders - ${err.message || err}`);
	}
};

const fixProjectFolders = async (projectName: string) => {
	// fixing
	await copyFolders(
		`${root}/${projectName}/src-${projectProps.base}`,
		`${root}/${projectName}/src`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-Common-${projectProps.base}`,
		`${root}/${projectName}/src/Common`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-${projectProps.state}`,
		`${root}/${projectName}/src`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-App-${projectProps.state}`,
		`${root}/${projectName}/src/App`,
		'fixProjectFolders',
	);
	await copyFolders(`${root}/${projectName}/Shared-src`, `${root}/${projectName}/src`, 'fixProjectFolders');
	await copyFolders(`${root}/${projectName}/Shared-Common`, `${root}/${projectName}/src/Common`, 'fixProjectFolders');

	// deleting extra
	await deleteFolder(`${root}/${projectName}/src-${projectProps.base}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-Common-${projectProps.base}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-${projectProps.state}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-App-${projectProps.state}`, 'delete');
	await deleteFolder(`${root}/${projectName}/Shared-src`, 'delete');
	await deleteFolder(`${root}/${projectName}/Shared-Common`, 'delete');
};

const getSpecificProjectResources = () => {
	return Object.values(projectProps).join('-');
};

const fixIfWebpack = async (projectName: string) => {
	if (projectProps.base === webpackKey) {
		await copyFolders(
			`${resources}/clients/React-${projectProps.state}`,
			`${root}/${projectName}`,
			`normalStructure - React-${projectProps.state}`,
		);
	}
};

const writeFile = (path: string, data: string) => {
	fs.writeFile(path, data, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${path} was created`);
	});
};

const createReadMeFile = async (path: string, projectName: string) => {
	writeFile(`${path}/README.md`, `# ${projectName}`);
};

const createPackageJsonFile = async (
	path: string,
	projectName: string,
	baseDepsKey: string,
	stateDepsKey: string,
	browsersListKey?: boolean,
) => {
	writeFile(`${path}/package.json`, getPackageJsonData({ projectName, baseDepsKey, stateDepsKey, browsersListKey }));
};

export const normalReact = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'CRA');
		projectProps.base = reactKey;
	} catch (err) {
		throw new Error(`normalReact - ${err.message || err}`);
	}
};

export const nextJs = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Next');
		projectProps.base = nextKey;
	} catch (err) {
		throw new Error(`nextJs - ${err.message || err}`);
	}
};

export const webpack = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Webpack');
		projectProps.base = webpackKey;
	} catch (err) {
		throw new Error(`webpack - ${err.message || err}`);
	}
};

export const mobx = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Mobx');
		projectProps.state = mobxKey;
	} catch (err) {
		throw new Error(`mobx - ${err.message || err}`);
	}
};

export const apollo = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Apollo');
		projectProps.state = apolloKey;
	} catch (err) {
		throw new Error(`apollo - ${err.message || err}`);
	}
};

export const normalStructure = async (projectName: string) => {
	try {
		const specificFolder = getSpecificProjectResources();
		await copyFolders(`${resources}/clients/Shared`, `${root}/${projectName}`, 'normalStructure - Shared');
		await fixIfWebpack(projectName);
		await copyFolders(
			`${resources}/clients/${specificFolder}`,
			`${root}/${projectName}`,
			`normalStructure - ${specificFolder}`,
		);
		await fixProjectFolders(projectName);
		await createReadMeFile(`${root}/${projectName}`, projectName);
		await createPackageJsonFile(`${root}/${projectName}`, projectName, projectProps.base, projectProps.state, true);
	} catch (err) {
		throw new Error(`normalStructure - ${err.message || err}`);
	}
};

export const normalWithServer = async (projectName: string) => {
	try {
		await normalStructure(projectName);
		await copyFolders(
			`${resources}/servers/${projectProps.state}-Server`,
			`${root}/${projectName}-server`,
			'normalWithServer - withServer',
		);
		await copyFolders(`${resources}/servers/Shared`, `${root}/${projectName}-server`, 'normalWithServer - Shared');
		await copyFolders(
			`${root}/${projectName}-server/src-Shared`,
			`${root}/${projectName}-server/src`,
			'normalWithServer - Shared',
		);
		await deleteFolder(`${root}/${projectName}-server/src-Shared`, 'delete');
		await createReadMeFile(`${root}/${projectName}-server`, `${projectName}-server`);
		// await createPackageJsonFile(
		// 	`${root}/${projectName}-server`,
		// 	`${projectName}-server`,
		// 	projectProps.base,
		// 	projectProps.state,
		// );
	} catch (err) {
		throw new Error(`normalWithServer - ${err.message || err}`);
	}
};

export const monorepo = async (projectName: string) => {
	try {
		// await copyFolders(`${resources}/Monorepo`, `${root}/${projectName}`, 'monorepo');
		// await copyFolders(`${root}/${projectName}/src`, `${root}/${projectName}/packages/client/src`, 'monorepo-mobx');
		// await deleteFolder(`${root}/${projectName}/src`, 'monorepo-delete');
	} catch (err) {
		throw new Error(`monorepo - ${err.message || err}`);
	}
};
