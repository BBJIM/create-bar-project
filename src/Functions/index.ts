import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';

const baseUrl = './src';

const promiseNcp = util.promisify(ncp);
const promiseRimraf = util.promisify(rimraf);

export const createFolder = async (name: string) => {
	try {
		await mkdirp(`${baseUrl}/Export/${name}`);
		console.log('created project folder');
	} catch (err) {
		console.error('createFolder', err);
		throw err;
	}
};

const copyFolders = async (source: string, destination: string, callingFunctionName: string) => {
	try {
		return promiseNcp(source, destination, { stopOnErr: true });
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

const sharedFolders = async (projectName: string) => {
	copyFolders(`${baseUrl}/Resources/Shared`, `${baseUrl}/Export/${projectName}`, 'sharedFolders');
};

export const normalReact = async (projectName: string) => {
	await sharedFolders(projectName);
	// copyFolders(`${baseUrl}/Resources/Normal React`, `${baseUrl}/Export/${projectName}`, 'normalReact');
};

export const nextJs = async (projectName: string) => {
	await sharedFolders(projectName);
	await copyFolders(`${baseUrl}/Resources/Next`, `${baseUrl}/Export/${projectName}`, 'nextJs');
};

export const normalStructure = async (projectName: string) => {
	await copyFolders(
		`${baseUrl}/Export/${projectName}/src/UI_KIT`,
		`${baseUrl}/Export/${projectName}/src/Components/UI_KIT`,
		'normalStructure',
	);
	await deleteFolder(`${baseUrl}/Export/${projectName}/src/UI_KIT`, 'normalStructure');
};

export const withServer = async (projectName: string) => {
	await normalStructure(projectName);
	await copyFolders(`${baseUrl}/Resources/Server`, `${baseUrl}/Export/${projectName}-server`, 'withServer');
};

export const monorepo = async (projectName: string) => {
	await copyFolders(`${baseUrl}/Resources/Monorepo`, `${baseUrl}/Export/${projectName}`, 'monorepo');
};

export const mobx = async (projectName: string) => {
	await copyFolders(`${baseUrl}/Resources/Mobx`, `${baseUrl}/Export/${projectName}/src`, 'mobx');
};

export const apollo = async (projectName: string) => {
	await copyFolders(`${baseUrl}/Resources/Apollo`, `${baseUrl}/Export/${projectName}/src`, 'apollo');
};
