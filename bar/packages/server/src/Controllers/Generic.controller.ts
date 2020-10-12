import actionWrapper from 'Common/Utils/ActionWrapper';
import { verifyToken } from 'Common/Utils/Token';
import express from 'express';
import { createModel, deleteModel, deleteModels, getModel, updateModel } from 'Logic';

const router = express.Router({ mergeParams: true });

router.post('/:model', (req, res) => {
	actionWrapper(res, createModel, req.params.model.toLowerCase(), req.body);
});

router.get('/:model/:id*?', (req, res) => {
	actionWrapper(
		res,
		getModel,
		req.params.model.toLowerCase(),
		req.params.id ? { _id: req.params.id } : {},
		req.query.populate,
		{
			[req.query.sort as string]: 1,
		},
	);
});

router.put('/:model/:id*?', verifyToken, (req, res) => {
	actionWrapper(
		res,
		updateModel,
		req.params.model.toLowerCase(),
		req.body,
		req.params.id ? { _id: req.params.id } : { ...req.query },
	);
});

router.delete('/:model/', verifyToken, (req, res) => {
	actionWrapper(
		res,
		deleteModels,
		req.params.model.toLowerCase(),
		req.query.ids ? { _id: req.query.ids } : { ...req.query },
	);
});

router.delete('/:model/:id*?', verifyToken, (req, res) => {
	actionWrapper(
		res,
		deleteModel,
		req.params.model.toLowerCase(),
		req.params.id ? { _id: req.params.id } : { ...req.query },
	);
});

export default router;
