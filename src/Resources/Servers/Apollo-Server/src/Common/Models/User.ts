import cryptPassword from 'Common/Utils/Bcrypt';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		birthDate: { type: Date, required: false },
		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
		},
	},
	{
		toJSON: {
			transform(_doc, ret) {
				delete ret.password;
				delete ret.__v;
			},
		},
	},
);

UserSchema.pre('save', function (next) {
	const user = this as any;
	if (this.isModified('password')) {
		user.password = cryptPassword(user.password);
	}
	next();
});

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);
