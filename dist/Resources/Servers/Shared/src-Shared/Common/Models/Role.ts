import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.__v;
			},
		},
	},
);

export const Role = mongoose.model('Role', RoleSchema);
export const RoleTC = composeWithMongoose(Role);
