import { notAllowedMessage } from 'Common/Consts';
import { login } from 'Logic';

export const getTokenFromReq = (req: any) => {
	return req.headers.authorization?.split('Bearer ')[1];
};

export const verifyToken = async (resolve: any, source: any, args: any, context: any, info: any) => {
	try {
		const token = context.token;
		const userData = await login(token); // TODO: maybe use cache
		if (userData) {
			return resolve(source, args, context, info);
		} else {
			throw new Error(notAllowedMessage);
		}
	} catch {
		throw new Error(notAllowedMessage);
	}
};
