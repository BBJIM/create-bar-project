import { notFoundMessage } from 'Common/Consts';
import models, { ModelName } from 'Common/Models';
import { FindObject } from 'Common/Utils/Types';
import { QueryPopulateOptions } from 'mongoose';

export const createModel = async (modelName: ModelName, modelData: any, populate: string = '') => {
	try {
		const model = models[modelName];
		const newModel = new model(modelData);
		return newModel
			.populate(populate)
			.execPopulate()
			.then((d) => {
				return d.save();
			});
	} catch (err) {
		throw err;
	}
};

export const getModel = async (
	modelName: ModelName,
	findObject: FindObject,
	populate: QueryPopulateOptions | QueryPopulateOptions[] | string = '',
	sort: { [key: string]: number } = {},
) => {
	try {
		const model = models[modelName];
		return model.find(findObject).populate(populate).sort(sort);
	} catch (err) {
		throw err;
	}
};

export const updateModel = async (modelName: ModelName, newModelData: any, findObject: FindObject) => {
	try {
		const modelResult = await getModel(modelName, findObject);
		if (modelResult && modelResult.length > 0) {
			const model = modelResult[0].set(newModelData);
			return model.save();
		} else {
			throw { message: notFoundMessage, status: 404 };
		}
	} catch (err) {
		throw err;
	}
};

export const deleteModels = async (modelName: ModelName, findObject: FindObject) => {
	try {
		const model = models[modelName];
		return model.deleteMany(findObject);
	} catch (err) {
		throw err;
	}
};

export const deleteModel = async (modelName: ModelName, findObject: FindObject) => {
	try {
		const model = models[modelName];
		return model.findOneAndDelete(findObject);
	} catch (err) {
		throw err;
	}
};
