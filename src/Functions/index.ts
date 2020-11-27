import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';

let resources = '';
const root = process.cwd();

const reactKey = 'React';
const nextKey = 'Next';
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

const sharedFolders = async (projectName: string, commonFolderName: string) => {
	try {
		copyFolders(`${resources}/Clients/Common/${commonFolderName}`, `${root}/${projectName}`, 'sharedFolders');
	} catch (err) {
		throw new Error(`sharedFolders - ${err.message || err}`);
	}
};

const fixProjectFolders = (projectType: string) => {
	console.log('fixProjectFolders', projectType);
};

const getSpecificProjectResources = () => {
	return Object.values(projectKeys).join('-');
};

export const normalReact = async (projectName: string) => {
	try {
		await sharedFolders(projectName, 'CRA');
		projectKeys.base = reactKey;
	} catch (err) {
		throw new Error(`normalReact - ${err.message || err}`);
	}
};

export const nextJs = async (projectName: string) => {
	try {
		await sharedFolders(projectName, 'Next');
		projectKeys.base = nextKey;
	} catch (err) {
		throw new Error(`nextJs - ${err.message || err}`);
	}
};

export const mobx = async (projectName: string) => {
	try {
		await sharedFolders(projectName, 'Mobx');
		projectKeys.state = mobxKey;
	} catch (err) {
		throw new Error(`mobx - ${err.message || err}`);
	}
};

export const apollo = async (projectName: string) => {
	try {
		await sharedFolders(projectName, 'Apollo');
		projectKeys.state = apolloKey;
	} catch (err) {
		throw new Error(`apollo - ${err.message || err}`);
	}
};

export const normalStructure = async (projectName: string) => {
	try {
		const specificFolder = getSpecificProjectResources();
		await copyFolders(
			`${resources}/clients/${specificFolder}`,
			`${root}/${projectName}`,
			'normalStructure - normalReact',
		);
		fixProjectFolders(specificFolder);
	} catch (err) {
		throw new Error(`normalStructure - ${err.message || err}`);
	}
};

export const webpackStructure = async (projectName: string) => {
	try {
		// await copyFolders(`${resources}/clients/Webpack`, `${root}/${projectName}`, 'webpackStructure - normalReact');
	} catch (err) {
		throw new Error(`webpackStructure - ${err.message || err}`);
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

export const webpackWithServer = async (projectName: string) => {
	try {
		// await webpackStructure(projectName);
		// await copyFolders(`${resources}/Server`, `${root}/${projectName}-server`, 'webpackWithServer - withServer');
	} catch (err) {
		throw new Error(`webpackWithServer - ${err.message || err}`);
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
