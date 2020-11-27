import { apollo, mobx, nextJs, normalReact } from '../Functions';

export const NORAML_REACT = 'normal react';
export const NEXT_JS = 'next.js';
export const NORMAL_STRUCTURE = 'normal';
export const WEBPACK_STRUCTURE = 'webpack';
export const NORMAL_AND_SERVER = 'normal + another server folder project';
export const WEBPACK_AND_SERVER = 'webpack + another server folder project';
export const MONOREPO = 'monorepo with the server and the client - not finished completely yet';
export const MOBX = 'mobx';
export const APOLLO = 'apollo with graphQL';

export const functions = {
	[NORAML_REACT]: normalReact,
	[NEXT_JS]: nextJs,
	// [NORMAL_STRUCTURE]: normalStructure,
	// [WEBPACK_STRUCTURE]: webpackStructure,
	// [NORMAL_AND_SERVER]: normalWithServer,
	// [WEBPACK_AND_SERVER]: webpackWithServer,
	// [MONOREPO]: monorepo,
	[MOBX]: mobx,
	[APOLLO]: apollo,
};
