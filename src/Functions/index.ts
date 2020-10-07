import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';
import path from 'path';

const baseUrl = './src';
const uiKit = 'UI-KIT';
const resources = `./dist/Resources`;
const root = path.dirname(require.main.filename);

const promiseNcp = util.promisify(ncp);
const promiseRimraf = util.promisify(rimraf);

export const createFolder = async (name: string) => {
	try {
		await mkdirp(`${root}/Export/${name}`);
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
		copyFolders(`${resources}/Shared`, `${root}/Export/${projectName}`, 'sharedFolders');
	} catch (err) {
		throw new Error(`sharedFolders - ${err.message || err}`);
	}
};

export const normalReact = async (projectName: string) => {
	try {
		await sharedFolders(projectName);
		// copyFolders(`${resources}/Normal React`, `${root}/Export/${projectName}`, 'normalReact');
	} catch (err) {
		throw new Error(`normalReact - ${err.message || err}`);
	}
};

export const nextJs = async (projectName: string) => {
	try {
		await sharedFolders(projectName);
		await copyFolders(`${resources}/Next`, `${root}/Export/${projectName}`, 'nextJs');
	} catch (err) {
		throw new Error(`nextJs - ${err.message || err}`);
	}
};

export const normalStructure = async (projectName: string) => {
	try {
		await copyFolders(
			`${root}/Export/${projectName}/src/${uiKit}`,
			`${root}/Export/${projectName}/src/Components/${uiKit}`,
			'normalStructure',
		);
		await deleteFolder(`${root}/Export/${projectName}/src/${uiKit}`, 'normalStructure');
	} catch (err) {
		throw new Error(`normalStructure - ${err.message || err}`);
	}
};

export const withServer = async (projectName: string) => {
	try {
		await normalStructure(projectName);
		await copyFolders(`${resources}/Server`, `${root}/Export/${projectName}-server`, 'withServer');
	} catch (err) {
		throw new Error(`withServer - ${err.message || err}`);
	}
};

export const monorepo = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Monorepo`, `${root}/Export/${projectName}`, 'monorepo');
	} catch (err) {
		throw new Error(`monorepo - ${err.message || err}`);
	}
};

export const mobx = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Mobx`, `${root}/Export/${projectName}/src`, 'mobx');
	} catch (err) {
		throw new Error(`mobx - ${err.message || err}`);
	}
};

export const apollo = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Apollo`, `${root}/Export/${projectName}/src`, 'apollo');
	} catch (err) {
		throw new Error(`apollo - ${err.message || err}`);
	}
};

export const exportProject = async () => {
	try {
		// await copyFolders(`${root}/Export`, `${__dirname}`, 'exportProject');
		// await deleteFolder(`${root}/Export`, 'exportProject');
	} catch (err) {
		throw new Error(`exportProject - ${err.message || err}`);
	}
};
