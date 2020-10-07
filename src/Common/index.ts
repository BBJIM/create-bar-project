import { apollo, mobx, monorepo, nextJs, normalReact, normalStructure, withServer } from '../Functions';

export const NORAML_REACT = 'normal react';
export const NEXT_JS = 'next.js';
export const NORMAL_STRUCTURE = 'normal';
export const NORMAL_AND_SERVER = 'normal + another server folder project';
export const MONOREPO = 'monorepo with the server and the client';
export const MOBX = 'mobx';
export const APOLLO = 'apollo js with graphQL';

export const functions = {
	[NORAML_REACT]: normalReact,
	[NEXT_JS]: nextJs,
	[NORMAL_STRUCTURE]: normalStructure,
	[NORMAL_AND_SERVER]: withServer,
	[MONOREPO]: monorepo,
	[MOBX]: mobx,
	[APOLLO]: apollo,
};
