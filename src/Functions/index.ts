import {
	apolloKey,
	clientGitIgnoreData,
	mobxKey,
	nextKey,
	reactKey,
	serverEnvData,
	serverGitIgnoreData,
	webpackKey,
} from '../Common';
import { copyFolders, deleteFolder, writeFile } from './FsUtils';
import { getPackageJsonData, getServerPackageJsonData } from './GetPackageJsonData';

let resources = '';
const root = process.cwd();

const projectProps = {
	base: '',
	state: '',
};

export const setResources = (value: string) => {
	resources = value;
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
	if (projectProps.base === nextKey) {
		await copyFolders(
			`${root}/${projectName}/src-Common-${projectProps.base}`,
			`${root}/${projectName}/src/Common`,
			'fixProjectFolders',
		);
	}
	if (projectProps.state === mobxKey) {
		await copyFolders(
			`${root}/${projectName}/react-mobx-index`,
			`${root}/${projectName}/src/Logic`,
			'fixProjectFolders',
		);
		await deleteFolder(`${root}/${projectName}/react-mobx-index`, 'delete');
	}
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
	await copyFolders(
		`${root}/${projectName}/src-Common-Utils`,
		`${root}/${projectName}/src/Common/Utils`,
		'fixProjectFolders',
	);
	await copyFolders(
		`${root}/${projectName}/src-components`,
		`${root}/${projectName}/src/Components`,
		'fixProjectFolders',
	);

	// deleting extra
	await deleteFolder(`${root}/${projectName}/src-${projectProps.base}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-Common-${projectProps.base}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-${projectProps.state}`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-App-${projectProps.state}`, 'delete');
	await deleteFolder(`${root}/${projectName}/Shared-src`, 'delete');
	await deleteFolder(`${root}/${projectName}/Shared-Common`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-Common-Utils`, 'delete');
	await deleteFolder(`${root}/${projectName}/src-components`, 'delete');
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

const fixIfApollo = async (projectName: string) => {
	if (projectProps.state === apolloKey) {
		await copyFolders(
			`${root}/${projectName}/src-Apollo-Apollo`,
			`${root}/${projectName}/src/Apollo`,
			'fixProjectFolders-Apollo',
		);
		await deleteFolder(`${root}/${projectName}/src-Apollo-Apollo`, 'delete-apollo');
	}
};

const createReadMeFile = async (path: string, projectName: string) => {
	writeFile(`${path}/README.md`, `# ${projectName}`);
};

const createClientGitIgnore = async (path: string) => {
	writeFile(`${path}/.gitignore`, clientGitIgnoreData);
};

const createServerGitIgnore = async (path: string) => {
	writeFile(`${path}/.gitignore`, serverGitIgnoreData);
};

const createServerEnvFile = async (path: string) => {
	writeFile(`${path}/.env`, serverEnvData);
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

const createServerPackageJsonFile = async (path: string, projectName: string, stateDepsKey: string) => {
	writeFile(`${path}/package.json`, getServerPackageJsonData({ stateDepsKey, projectName }));
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
		if (projectProps.base !== webpackKey) {
			await copyFolders(
				`${resources}/clients/${specificFolder}`,
				`${root}/${projectName}`,
				`normalStructure - ${specificFolder}`,
			);
		}
		await fixIfWebpack(projectName);
		await fixIfApollo(projectName);
		await createReadMeFile(`${root}/${projectName}`, projectName);
		await createClientGitIgnore(`${root}/${projectName}`);
		await createPackageJsonFile(`${root}/${projectName}`, projectName, projectProps.base, projectProps.state, true);
		await fixProjectFolders(projectName);
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
		await createServerPackageJsonFile(`${root}/${projectName}-server`, `${projectName}-server`, projectProps.state);
		await createServerGitIgnore(`${root}/${projectName}-server`);
		await createServerEnvFile(`${root}/${projectName}-server`);
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
