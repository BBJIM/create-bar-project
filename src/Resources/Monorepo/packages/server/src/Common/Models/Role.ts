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

export default mongoose.model('Role', RoleSchema);
