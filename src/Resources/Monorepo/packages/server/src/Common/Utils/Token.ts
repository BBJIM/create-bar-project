import { notAllowedMessage } from 'Common/Consts';

export const getTokenFromReq = (req) => {
	return req.headers.authorization?.split('Bearer ')[1];
};

export const verifyToken = (req, res, next) => {
	const token = getTokenFromReq(req);
	if (token) {
		next();
	} else {
		res.status(403).send(notAllowedMessage);
	}
};
