import Role from './Role';
import User from './User';

export const ModelTypes = {
	User,
	Role,
};

export type ModelsName = keyof typeof ModelTypes;

export { default as Role } from './Role';
export { default as User } from './User';
