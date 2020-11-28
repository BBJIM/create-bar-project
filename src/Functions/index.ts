import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';
import fs from 'fs';

let resources = '';
const root = process.cwd();

const reactKey = 'React';
const nextKey = 'Next';
const webpackKey = 'Webpack';
const apolloKey = 'Apollo';
const mobxKey = 'Mobx';
const projectKeys = {
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
		`${root}/${projectName}/src-${projectKeys.base}`,
		`${root}/${projectName}/src`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-Common-${projectKeys.base}`,
		`${root}/${projectName}/src/Common`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-${projectKeys.state}`,
		`${root}/${projectName}/src`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-App-${projectKeys.state}`,
		`${root}/${projectName}/src/App`,
		'fixProjectFolders',
	);
	await copyFolders(`${root}/${projectName}/Shared-src`, `${root}/${projectName}/src`, 'fixProjectFolders');
	await copyFolders(`${root}/${projectName}/Shared-Common`, `${root}/${projectName}/src/Common`, 'fixProjectFolders');

	// deleting extra
	await deleteFolder(`${root}/${projectName}/src-${projectKeys.base}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-Common-${projectKeys.base}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-${projectKeys.state}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-App-${projectKeys.state}`, 'delete');
	await deleteFolder(`${root}/${projectName}/Shared-src`, 'delete');
	await deleteFolder(`${root}/${projectName}/Shared-Common`, 'delete');
};

const getSpecificProjectResources = () => {
	return Object.values(projectKeys).join('-');
};

const fixIfWebpack = async (projectName: string) => {
	if (projectKeys.base === webpackKey) {
		await copyFolders(
			`${resources}/clients/React-${projectKeys.state}`,
			`${root}/${projectName}`,
			`normalStructure - React-${projectKeys.state}`,
		);
	}
};

export const normalReact = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'CRA');
		projectKeys.base = reactKey;
	} catch (err) {
		throw new Error(`normalReact - ${err.message || err}`);
	}
};

export const nextJs = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Next');
		projectKeys.base = nextKey;
	} catch (err) {
		throw new Error(`nextJs - ${err.message || err}`);
	}
};

export const webpack = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Webpack');
		projectKeys.base = webpackKey;
	} catch (err) {
		throw new Error(`webpack - ${err.message || err}`);
	}
};

export const mobx = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Mobx');
		projectKeys.state = mobxKey;
	} catch (err) {
		throw new Error(`mobx - ${err.message || err}`);
	}
};

export const apollo = async (projectName: string) => {
	try {
		await copyProjectCommonFolders(projectName, 'Apollo');
		projectKeys.state = apolloKey;
	} catch (err) {
		throw new Error(`apollo - ${err.message || err}`);
	}
};

export const normalStructure = async (projectName: string) => {
	try {
		const specificFolder = getSpecificProjectResources();
		await copyFolders(`${resources}/clients/Shared`, `${root}/${projectName}`, 'normalStructure - Shared');
		await copyFolders(
			`${resources}/clients/${specificFolder}`,
			`${root}/${projectName}`,
			`normalStructure - ${specificFolder}`,
		);
		await fixIfWebpack(projectName);
		await fixProjectFolders(projectName);
	} catch (err) {
		throw new Error(`normalStructure - ${err.message || err}`);
	}
};

export const normalWithServer = async (projectName: string) => {
	try {
		await normalStructure(projectName);
		await copyFolders(
			`${resources}/servers/${projectKeys.state}-Server`,
			`${root}/${projectName}-server`,
			'normalWithServer - withServer',
		);
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
