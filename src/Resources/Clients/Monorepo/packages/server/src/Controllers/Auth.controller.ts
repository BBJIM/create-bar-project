import actionWrapper from 'Common/Utils/ActionWrapper';
import { getTokenFromReq } from 'Common/Utils/Token';
import express from 'express';
import { login } from 'Logic';
import { register } from 'Logic/Auth.logic';

const router = express.Router({ mergeParams: true });

router.post('/login', (req, res) => {
	const token = getTokenFromReq(req);
	actionWrapper(res, login, token, req.body);
});

router.post('/register', (req, res) => {
	actionWrapper(res, register, req.body);
});

export default router;
