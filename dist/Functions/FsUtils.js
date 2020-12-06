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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.deleteFolder = exports.copyFolders = exports.checkIfFolderExists = exports.createFolderByName = void 0;
const fs_1 = __importDefault(require("fs"));
const Functions_1 = require("../Functions");
const mkdirp_1 = __importDefault(require("mkdirp"));
const ncp_1 = __importDefault(require("ncp"));
const rimraf_1 = __importDefault(require("rimraf"));
const util_1 = __importDefault(require("util"));
const root = process.cwd();
const promiseNcp = util_1.default.promisify(ncp_1.default);
const promiseRimraf = util_1.default.promisify(rimraf_1.default);
exports.createFolderByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Functions_1.setResources(__dirname.replace('Functions', 'Resources'));
        yield mkdirp_1.default(`${root}/${name}`);
        console.log(`created folder - ${name}`);
    }
    catch (err) {
        throw new Error(`createFolderByName - ${err.message || err}`);
    }
});
exports.checkIfFolderExists = (path) => {
    return fs_1.default.existsSync(path);
};
exports.copyFolders = (source, destination, callingFunctionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (exports.checkIfFolderExists(source)) {
            return promiseNcp(source, destination, { stopOnErr: true });
        }
        else {
            console.log(`copyFolders - ${callingFunctionName} - folder - ${source}, didnt exist, didnt copy`);
        }
    }
    catch (err) {
        throw new Error(`copyFolders - ${callingFunctionName} ${err.message || err}`);
    }
});
exports.deleteFolder = (source, callingFunctionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return promiseRimraf(source);
    }
    catch (err) {
        throw new Error(`deleteFolder - ${callingFunctionName} ${err.message || err}`);
    }
});
exports.writeFile = (path, data) => {
    fs_1.default.writeFile(path, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log(`${path} was created`);
    });
};
