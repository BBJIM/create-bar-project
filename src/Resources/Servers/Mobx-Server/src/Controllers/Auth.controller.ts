import actionWrapper from 'Common/Utils/ActionWrapper';
import { getTokenFromReq } from 'Common/Utils/VerifyToken';
import express from 'express';
import { login, register } from 'Logic';

const router = express.Router({ mergeParams: true });

router.post('/login', (req, res) => {
	const token = getTokenFromReq(req);
	actionWrapper({ res, action: login, actionParams: [token, req.body] });
});

router.post('/register', (req, res) => {
	actionWrapper({ res, action: register, actionParams: [req.body] });
});

export default router;
