"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monorepo = exports.normalWithServer = exports.normalStructure = exports.apollo = exports.mobx = exports.webpack = exports.nextJs = exports.normalReact = exports.setResources = void 0;
const Common_1 = require("../Common");
const FsUtils_1 = require("./FsUtils");
const GetPackageJsonData_1 = require("./GetPackageJsonData");
let resources = '';
const root = process.cwd();
const projectProps = {
    base: '',
    state: '',
};
exports.setResources = (value) => {
    resources = value;
};
const copyProjectCommonFolders = (projectName, commonFolderName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        FsUtils_1.copyFolders(`${resources}/Clients/Common/${commonFolderName}`, `${root}/${projectName}`, 'sharedFolders');
    }
    catch (err) {
        throw new Error(`sharedFolders - ${err.message || err}`);
    }
});
const fixProjectFolders = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    // fixing
    yield FsUtils_1.copyFolders(`${root}/${projectName}/src-${projectProps.base}`, `${root}/${projectName}/src`, 'fixProjectFolders');
    yield FsUtils_1.copyFolders(`${root}/${projectName}/src-Common-${projectProps.base}`, `${root}/${projectName}/src/Common`, 'fixProjectFolders');
    yield FsUtils_1.copyFolders(`${root}/${projectName}/src-${projectProps.state}`, `${root}/${projectName}/src`, 'fixProjectFolders');
    yield FsUtils_1.copyFolders(`${root}/${projectName}/src-App-${projectProps.state}`, `${root}/${projectName}/src/App`, 'fixProjectFolders');
    yield FsUtils_1.copyFolders(`${root}/${projectName}/Shared-src`, `${root}/${projectName}/src`, 'fixProjectFolders');
    yield FsUtils_1.copyFolders(`${root}/${projectName}/Shared-Common`, `${root}/${projectName}/src/Common`, 'fixProjectFolders');
    // deleting extra
    yield FsUtils_1.deleteFolder(`${root}/${projectName}/src-${projectProps.base}`, 'delete');
    yield FsUtils_1.deleteFolder(`${root}/${projectName}/src-Common-${projectProps.base}`, 'delete');
    yield FsUtils_1.deleteFolder(`${root}/${projectName}/src-${projectProps.state}`, 'delete');
    yield FsUtils_1.deleteFolder(`${root}/${projectName}/src-App-${projectProps.state}`, 'delete');
    yield FsUtils_1.deleteFolder(`${root}/${projectName}/Shared-src`, 'delete');
    yield FsUtils_1.deleteFolder(`${root}/${projectName}/Shared-Common`, 'delete');
});
const getSpecificProjectResources = () => {
    return Object.values(projectProps).join('-');
};
const fixIfWebpack = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    if (projectProps.base === Common_1.webpackKey) {
        yield FsUtils_1.copyFolders(`${resources}/clients/React-${projectProps.state}`, `${root}/${projectName}`, `normalStructure - React-${projectProps.state}`);
    }
});
const createReadMeFile = (path, projectName) => __awaiter(void 0, void 0, void 0, function* () {
    FsUtils_1.writeFile(`${path}/README.md`, `# ${projectName}`);
});
const createServerGitIgnore = (path) => __awaiter(void 0, void 0, void 0, function* () {
    FsUtils_1.writeFile(`${path}/.gitignore`, Common_1.serverGitIgnoreData);
});
const createServerEnvFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    FsUtils_1.writeFile(`${path}/.env`, Common_1.serverEnvData);
});
const createPackageJsonFile = (path, projectName, baseDepsKey, stateDepsKey, browsersListKey) => __awaiter(void 0, void 0, void 0, function* () {
    FsUtils_1.writeFile(`${path}/package.json`, GetPackageJsonData_1.getPackageJsonData({ projectName, baseDepsKey, stateDepsKey, browsersListKey }));
});
const createServerPackageJsonFile = (path, projectName, stateDepsKey) => __awaiter(void 0, void 0, void 0, function* () {
    FsUtils_1.writeFile(`${path}/package.json`, GetPackageJsonData_1.getServerPackageJsonData({ stateDepsKey, projectName }));
});
exports.normalReact = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield copyProjectCommonFolders(projectName, 'CRA');
        projectProps.base = Common_1.reactKey;
    }
    catch (err) {
        throw new Error(`normalReact - ${err.message || err}`);
    }
});
exports.nextJs = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield copyProjectCommonFolders(projectName, 'Next');
        projectProps.base = Common_1.nextKey;
    }
    catch (err) {
        throw new Error(`nextJs - ${err.message || err}`);
    }
});
exports.webpack = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield copyProjectCommonFolders(projectName, 'Webpack');
        projectProps.base = Common_1.webpackKey;
    }
    catch (err) {
        throw new Error(`webpack - ${err.message || err}`);
    }
});
exports.mobx = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield copyProjectCommonFolders(projectName, 'Mobx');
        projectProps.state = Common_1.mobxKey;
    }
    catch (err) {
        throw new Error(`mobx - ${err.message || err}`);
    }
});
exports.apollo = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield copyProjectCommonFolders(projectName, 'Apollo');
        projectProps.state = Common_1.apolloKey;
    }
    catch (err) {
        throw new Error(`apollo - ${err.message || err}`);
    }
});
exports.normalStructure = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specificFolder = getSpecificProjectResources();
        yield FsUtils_1.copyFolders(`${resources}/clients/Shared`, `${root}/${projectName}`, 'normalStructure - Shared');
        yield fixIfWebpack(projectName);
        yield FsUtils_1.copyFolders(`${resources}/clients/${specificFolder}`, `${root}/${projectName}`, `normalStructure - ${specificFolder}`);
        yield fixProjectFolders(projectName);
        yield createReadMeFile(`${root}/${projectName}`, projectName);
        yield createPackageJsonFile(`${root}/${projectName}`, projectName, projectProps.base, projectProps.state, true);
    }
    catch (err) {
        throw new Error(`normalStructure - ${err.message || err}`);
    }
});
exports.normalWithServer = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.normalStructure(projectName);
        yield FsUtils_1.copyFolders(`${resources}/servers/${projectProps.state}-Server`, `${root}/${projectName}-server`, 'normalWithServer - withServer');
        yield FsUtils_1.copyFolders(`${resources}/servers/Shared`, `${root}/${projectName}-server`, 'normalWithServer - Shared');
        yield FsUtils_1.copyFolders(`${root}/${projectName}-server/src-Shared`, `${root}/${projectName}-server/src`, 'normalWithServer - Shared');
        yield FsUtils_1.deleteFolder(`${root}/${projectName}-server/src-Shared`, 'delete');
        yield createReadMeFile(`${root}/${projectName}-server`, `${projectName}-server`);
        yield createServerPackageJsonFile(`${root}/${projectName}-server`, `${projectName}-server`, projectProps.state);
        yield createServerGitIgnore(`${root}/${projectName}-server`);
        yield createServerEnvFile(`${root}/${projectName}-server`);
    }
    catch (err) {
        throw new Error(`normalWithServer - ${err.message || err}`);
    }
});
exports.monorepo = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await copyFolders(`${resources}/Monorepo`, `${root}/${projectName}`, 'monorepo');
        // await copyFolders(`${root}/${projectName}/src`, `${root}/${projectName}/packages/client/src`, 'monorepo-mobx');
        // await deleteFolder(`${root}/${projectName}/src`, 'monorepo-delete');
    }
    catch (err) {
        throw new Error(`monorepo - ${err.message || err}`);
    }
});
