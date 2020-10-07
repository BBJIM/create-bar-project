import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';

const baseUrl = './src';
const uiKit = 'UI-KIT';
const resources = './Resources';

const promiseNcp = util.promisify(ncp);
const promiseRimraf = util.promisify(rimraf);

export const createFolder = async (name: string) => {
	try {
		await mkdirp(`${baseUrl}/Export/${name}`);
		console.log('created project folder');
	} catch (err) {
		throw new Error(`createFolder - ${err.message || err}`);
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
	try {
		copyFolders(`${resources}/Shared`, `${baseUrl}/Export/${projectName}`, 'sharedFolders');
	} catch (err) {
		throw new Error(`sharedFolders - ${err.message || err}`);
	}
};

export const normalReact = async (projectName: string) => {
	try {
		await sharedFolders(projectName);
		// copyFolders(`${resources}/Normal React`, `${baseUrl}/Export/${projectName}`, 'normalReact');
	} catch (err) {
		throw new Error(`normalReact - ${err.message || err}`);
	}
};

export const nextJs = async (projectName: string) => {
	try {
		await sharedFolders(projectName);
		await copyFolders(`${resources}/Next`, `${baseUrl}/Export/${projectName}`, 'nextJs');
	} catch (err) {
		throw new Error(`nextJs - ${err.message || err}`);
	}
};

export const normalStructure = async (projectName: string) => {
	try {
		await copyFolders(
			`${baseUrl}/Export/${projectName}/src/${uiKit}`,
			`${baseUrl}/Export/${projectName}/src/Components/${uiKit}`,
			'normalStructure',
		);
		await deleteFolder(`${baseUrl}/Export/${projectName}/src/${uiKit}`, 'normalStructure');
	} catch (err) {
		throw new Error(`normalStructure - ${err.message || err}`);
	}
};

export const withServer = async (projectName: string) => {
	try {
		await normalStructure(projectName);
		await copyFolders(`${resources}/Server`, `${baseUrl}/Export/${projectName}-server`, 'withServer');
	} catch (err) {
		throw new Error(`withServer - ${err.message || err}`);
	}
};

export const monorepo = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Monorepo`, `${baseUrl}/Export/${projectName}`, 'monorepo');
	} catch (err) {
		throw new Error(`monorepo - ${err.message || err}`);
	}
};

export const mobx = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Mobx`, `${baseUrl}/Export/${projectName}/src`, 'mobx');
	} catch (err) {
		throw new Error(`mobx - ${err.message || err}`);
	}
};

export const apollo = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Apollo`, `${baseUrl}/Export/${projectName}/src`, 'apollo');
	} catch (err) {
		throw new Error(`apollo - ${err.message || err}`);
	}
};

export const exportProject = async () => {
	try {
		console.log('asdasd', __dirname);
		await copyFolders(`${baseUrl}/Export`, `${__dirname}`, 'exportProject');
		await deleteFolder(`${baseUrl}/Export`, 'exportProject');
	} catch (err) {
		throw new Error(`exportProject - ${err.message || err}`);
	}
};
