import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';

const uiKit = 'UI-KIT';
let resources = '';
const root = process.cwd();

const promiseNcp = util.promisify(ncp);
const promiseRimraf = util.promisify(rimraf);

export const createFolder = async (name: string) => {
	try {
		resources = __dirname.replace('Functions', 'Resources');
		await mkdirp(`${root}/${name}`);
		console.log(`created folder - ${name}`);
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
		copyFolders(`${resources}/Shared`, `${root}/${projectName}`, 'sharedFolders');
	} catch (err) {
		throw new Error(`sharedFolders - ${err.message || err}`);
	}
};

export const normalReact = async (projectName: string) => {
	try {
		await sharedFolders(projectName);
	} catch (err) {
		throw new Error(`normalReact - ${err.message || err}`);
	}
};

export const nextJs = async (projectName: string) => {
	try {
		await sharedFolders(projectName);
		await copyFolders(`${resources}/Next`, `${root}/${projectName}`, 'nextJs');
	} catch (err) {
		throw new Error(`nextJs - ${err.message || err}`);
	}
};

export const mobx = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Mobx`, `${root}/${projectName}/src`, 'mobx');
	} catch (err) {
		throw new Error(`mobx - ${err.message || err}`);
	}
};

export const apollo = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Apollo`, `${root}/${projectName}/src`, 'apollo');
	} catch (err) {
		throw new Error(`apollo - ${err.message || err}`);
	}
};

export const normalStructure = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Normal React`, `${root}/${projectName}`, 'normalReact');
		await copyFolders(
			`${root}/${projectName}/src/${uiKit}`,
			`${root}/${projectName}/src/Components/${uiKit}`,
			'normalStructure',
		);
		await deleteFolder(`${root}/${projectName}/src/${uiKit}`, 'normalStructure');
	} catch (err) {
		throw new Error(`normalStructure - ${err.message || err}`);
	}
};

export const withServer = async (projectName: string) => {
	try {
		await normalStructure(projectName);
		await copyFolders(`${resources}/Server`, `${root}/${projectName}-server`, 'withServer');
	} catch (err) {
		throw new Error(`withServer - ${err.message || err}`);
	}
};

export const monorepo = async (projectName: string) => {
	try {
		await copyFolders(`${resources}/Monorepo`, `${root}/${projectName}`, 'monorepo');
		await copyFolders(`${root}/${projectName}/src`, `${root}/${projectName}/packages/client/src`, 'monorepo-mobx');
		await deleteFolder(`${root}/${projectName}/src`, 'monorepo-delete');
	} catch (err) {
		throw new Error(`monorepo - ${err.message || err}`);
	}
};
