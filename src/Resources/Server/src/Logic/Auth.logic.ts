import bcrypt from 'bcrypt';
import * as config from 'Config/config.json';
import jwt from 'jsonwebtoken';
import { createModel, getModel } from 'Logic';

type UserData = { email?: string; password?: string };

const returnUser = (data: any) => {
	delete data._doc.password;
	delete data._doc.__v;
	return data._doc;
};

export const login = async (token?: string, userInfo: UserData = {}) => {
	try {
		const userObject: UserData = userInfo;
		const jwtKey = config.jwtKey;

		if (token) {
			const { email, password }: any = jwt.verify(token, jwtKey);
			userObject.email = email;
			userObject.password = password;
		} else {
			try {
				token = jwt.sign({ email: userInfo.email, password: userInfo.password }, jwtKey);
			} catch (err) {
				throw err;
			}
		}
		if (userObject.email) {
			const result = await getModel('user', { email: userObject.email }, 'role');
			if (result && result.length > 0) {
				const user: any = result[0];
				if (bcrypt.compareSync(userInfo.password, user.password)) {
					return { token, ...returnUser(user) };
				} else {
					throw { message: 'Password not mathcing', status: 401 };
				}
			}
			throw { message: 'Email not mathcing', status: 401 };
		}
		throw { message: 'No Token', status: 401 };
	} catch (err) {
		throw err;
	}
};

export const register = async (userInfo: UserData) => {
	const jwtKey = config.jwtKey;
	const token = jwt.sign({ email: userInfo.email, password: userInfo.password }, jwtKey);
	const newUser: any = await createModel('user', userInfo, 'role');
	return { token, ...returnUser(newUser) };
};
