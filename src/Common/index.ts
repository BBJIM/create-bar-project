import { apollo, mobx, monorepo, nextJs, normalReact, normalStructure, normalWithServer, webpack } from '../Functions';

export const NORAML_REACT = 'normal react';
export const NEXT_JS = 'next.js';
export const NORMAL_STRUCTURE = 'normal';
export const WEBPACK = 'webpack';
export const NORMAL_AND_SERVER = 'normal + another server folder project';
export const MONOREPO = 'monorepo with the server and the client - not finished completely yet';
export const MOBX = 'mobx';
export const APOLLO = 'apollo with graphQL';

export const functions = {
	[NORAML_REACT]: normalReact,
	[NEXT_JS]: nextJs,
	[WEBPACK]: webpack,
	[MOBX]: mobx,
	[APOLLO]: apollo,
	[NORMAL_STRUCTURE]: normalStructure,
	[NORMAL_AND_SERVER]: normalWithServer,
	[MONOREPO]: monorepo,
};
