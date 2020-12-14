import { Role } from './Role';
import { User } from './User';

const models = {
	user: User,
	role: Role,
};

export type ModelName = keyof typeof models;

export default models;
