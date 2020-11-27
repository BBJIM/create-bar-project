import { notAllowedMessage } from 'Common/Consts';
import { login } from 'Logic';

export const getTokenFromReq = (req) => {
	return req.headers.authorization?.split('Bearer ')[1];
};

export const verifyToken = async (req, res, next) => {
	try {
		const token = getTokenFromReq(req);
		const userData = await login(token); // TODO: maybe use cache
		if (userData) {
			next();
		} else {
			res.status(403).send(notAllowedMessage);
		}
	} catch (err) {
		res.status(403).send(notAllowedMessage, err.message || err);
	}
};
