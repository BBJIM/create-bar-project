import ncp from 'ncp';
import mkdirp from 'mkdirp';

const baseUrl = './src';

export const createFolder = async (name: string) => {
	await mkdirp(`${baseUrl}/Export/${name}`);
	console.log('created project folder');
};

const copyFolders = (source: string, destination: string) => {
	ncp(source, destination, (err) => {
		if (err) {
			return console.error(err);
		}
	});
};

const sharedFolders = (projectName: string) => {
	copyFolders(`${baseUrl}/Resources/Shared`, `${baseUrl}/Export/${projectName}`);
	console.log('sharedFolders');
};

export const normalReact = (projectName: string) => {
	sharedFolders(projectName);
	copyFolders(`${baseUrl}/Resources/Normal React`, `${baseUrl}/Export/${projectName}`);
};

export const nextJs = (projectName: string) => {
	sharedFolders(projectName);
	copyFolders(`${baseUrl}/Resources/Next`, `${baseUrl}/Export/${projectName}`);
};

export const normalStructure = (projectName: string) => {
	console.log(`normalStructure TEMP ${projectName}`);
	// copyFolders(`${baseUrl}/Resources/Normal React`, `${baseUrl}/Export/${projectName}`);
};

export const withServer = (projectName: string) => {
	copyFolders(`${baseUrl}/Resources/Server`, `${baseUrl}/Export/${projectName}-server`);
};

export const monorepo = (projectName: string) => {
	copyFolders(`${baseUrl}/Resources/Monorepo`, `${baseUrl}/Export/${projectName}`);
};

export const mobx = (projectName: string) => {
	copyFolders(`${baseUrl}/Resources/Mobx`, `${baseUrl}/Export/${projectName}`);
};

export const apollo = (projectName: string) => {
	copyFolders(`${baseUrl}/Resources/Apollo`, `${baseUrl}/Export/${projectName}`);
};
