import actionWrapper from 'Common/Utils/ActionWrapper';
import { verifyToken } from 'Common/Utils/VerifyToken';
import express from 'express';
import { createModel, deleteModel, deleteModels, getModel, updateModel } from 'Logic';

const router = express.Router({ mergeParams: true });

router.post('/:model', verifyToken, (req, res) => {
	actionWrapper({ res, action: createModel, actionParams: [req.params.model.toLowerCase(), req.body] });
});

router.get('/:model/:id*?', (req, res) => {
	actionWrapper({
		res,
		action: getModel,
		actionParams: [
			req.params.model.toLowerCase(),
			req.params.id ? { _id: req.params.id } : {},
			req.query.populate,
			{
				[req.query.sort as string]: 1,
			},
		],
	});
});

router.put('/:model/:id*?', verifyToken, (req, res) => {
	actionWrapper({
		res,
		action: updateModel,
		actionParams: [
			req.params.model.toLowerCase(),
			req.body,
			req.params.id ? { _id: req.params.id } : { ...req.query },
		],
	});
});

router.delete('/:model/', verifyToken, (req, res) => {
	actionWrapper({
		res,
		action: deleteModels,
		actionParams: [req.params.model.toLowerCase(), req.query.ids ? { _id: req.query.ids } : { ...req.query }],
	});
});

router.delete('/:model/:id*?', verifyToken, (req, res) => {
	actionWrapper({
		res,
		action: deleteModel,
		actionParams: [req.params.model.toLowerCase(), req.params.id ? { _id: req.params.id } : { ...req.query }],
	});
});

export default router;
