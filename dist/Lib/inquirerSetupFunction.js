"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const Common_1 = require("../Common");
const inquirerFunctions = {
    getValidProjectName: () => {
        const questions = [
            {
                name: 'projectName',
                type: 'input',
                message: 'Enter your project name:',
                validate: (value) => {
                    if (value.length) {
                        return true;
                    }
                    else {
                        return 'Please enter your project name.';
                    }
                },
            },
        ];
        return inquirer_1.default.prompt(questions);
    },
    setupProjectFolders: () => {
        const questions = [
            {
                type: 'list',
                name: 'framework',
                message: 'Select the "framework" you want to work with:',
                choices: [Common_1.NORAML_REACT, Common_1.NEXT_JS, Common_1.WEBPACK],
                default: 0,
            },
            {
                type: 'list',
                name: 'globalState',
                message: 'Select state managment to work with:',
                choices: [Common_1.MOBX, Common_1.APOLLO],
                default: 0,
            },
            {
                type: 'list',
                name: 'structure',
                message: 'Select the project structure:',
                // choices: [NORMAL_STRUCTURE, NORMAL_AND_SERVER, MONOREPO],
                choices: [Common_1.NORMAL_STRUCTURE, Common_1.NORMAL_AND_SERVER],
                default: 0,
            },
        ];
        return inquirer_1.default.prompt(questions);
    },
};
exports.default = inquirerFunctions;
