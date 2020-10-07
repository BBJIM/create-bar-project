import mkdirp from 'mkdirp';
import ncp from 'ncp';
import util from 'util';

const baseUrl = './dist';

const promiseNcp = util.promisify(ncp);

const createFolder = async (name: string) => {
	try {
		await mkdirp(`${baseUrl}/${name}`);
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

const main = async () => {
	await createFolder('Resources');
	await copyFolders('./src/Resources', `${baseUrl}/Resources`, 'main');
};

main();
