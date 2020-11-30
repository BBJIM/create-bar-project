import fs from 'fs';
import { setResources } from 'Functions';
import mkdirp from 'mkdirp';
import ncp from 'ncp';
import rimraf from 'rimraf';
import util from 'util';

const root = process.cwd();

const promiseNcp = util.promisify(ncp);
const promiseRimraf = util.promisify(rimraf);

export const createFolderByName = async (name: string) => {
	try {
		setResources(__dirname.replace('Functions', 'Resources'));
		await mkdirp(`${root}/${name}`);
		console.log(`created folder - ${name}`);
	} catch (err) {
		throw new Error(`createFolderByName - ${err.message || err}`);
	}
};

export const checkIfFolderExists = (path: string) => {
	return fs.existsSync(path);
};

export const copyFolders = async (source: string, destination: string, callingFunctionName: string) => {
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

export const deleteFolder = async (source: string, callingFunctionName: string) => {
	try {
		return promiseRimraf(source);
	} catch (err) {
		throw new Error(`deleteFolder - ${callingFunctionName} ${err.message || err}`);
	}
};

export const writeFile = (path: string, data: string) => {
	fs.writeFile(path, data, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log(`${path} was created`);
	});
};
