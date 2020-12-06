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
const chalk_1 = __importDefault(require("chalk"));
const Common_1 = require("../Common");
const console_1 = require("console");
const figlet_1 = __importDefault(require("figlet"));
const FsUtils_1 = require("../Functions/FsUtils");
const inquirerSetupFunction_1 = __importDefault(require("../Lib/inquirerSetupFunction"));
console_1.clear();
/**
 * if you make a change:
 * need to run `yarn out-bin`, then you can use it with the new version in the cmd.
 */
console.log(chalk_1.default.yellow(figlet_1.default.textSync('Bar Base Project', { horizontalLayout: 'full' })));
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { getValidProjectName, setupProjectFolders } = inquirerSetupFunction_1.default;
        const { projectName } = yield getValidProjectName();
        yield FsUtils_1.createFolderByName(projectName);
        const result = yield setupProjectFolders();
        const keys = Object.values(result);
        for (const key of keys) {
            yield Common_1.functions[key](projectName);
        }
        console.log(chalk_1.default.yellow(figlet_1.default.textSync('FINSHED!')));
    }
    catch (err) {
        console.error(err);
    }
});
run();
