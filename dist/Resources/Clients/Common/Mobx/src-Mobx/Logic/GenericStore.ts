import API from 'Api';
import { alertMessage, hideAfterTimeSec } from 'Common/AlertMessage';
import { ModelsName, ModelTypes } from 'Common/Models';
import { action, observable, toJS } from 'mobx';

export default class GenericStore {
	@observable
	private allBasicModels: any = observable.object({});

	constructor() {
		Object.keys(ModelTypes).forEach((modelName) => {
			const ModelClass = ModelTypes[modelName as ModelsName];
			type ModelType = typeof ModelClass;
			this.allBasicModels[modelName] = observable.array<ModelType>();
		});
	}

	public getModels(modelName: ModelsName): any {
		return toJS(this.allBasicModels[modelName]);
	}

	@action
	public setModels(modelName: ModelsName, newModels: any[]): void {
		this.allBasicModels[modelName].replace(newModels);
	}

	@action
	public async fetch(modelName: ModelsName, id?: string): Promise<void> {
		try {
			const list: any[] = await API.get(`/${modelName}/${id ? id : ''}`);
			this.setModels(modelName, list);
		} catch (err) {
			alertMessage.error(err.message, { hideAfter: hideAfterTimeSec });
		}
	}

	@action
	public async create(modelName: ModelsName, modelData: any): Promise<any> {
		try {
			const created: any = await API.post(`/${modelName}`, modelData);
			this.setModels(modelName, [...this.getModels(modelName), created]);
			return created;
		} catch (err) {
			alertMessage.error(err.message, { hideAfter: hideAfterTimeSec });
		}
	}

	@action
	public async update(modelName: ModelsName, modelData: any): Promise<any> {
		try {
			const newModelData = { ...modelData };
			delete newModelData._id;
			const updated: any = await API.put(`${modelName}/${modelData._id}`, newModelData);
			const currentArr: any[] = this.getModels(modelName);
			const index = currentArr.findIndex((item) => item._id === modelData._id);
			currentArr[index] = { ...updated };
			this.setModels(modelName, currentArr);
			return updated;
		} catch (err) {
			alertMessage.error(err.message, { hideAfter: hideAfterTimeSec });
		}
	}

	@action
	public async delete(modelName: ModelsName, ids: string[]): Promise<any> {
		try {
			const query = `${ids.map((i) => `_id=${i}&`).join('')}`;
			const deleted: any = await API.delete(`${modelName}?${query}`);
			const currentArr: any[] = this.getModels(modelName);
			this.setModels(
				modelName,
				currentArr.filter((item) => !ids.includes(item._id)),
			);
			return deleted;
		} catch (err) {
			alertMessage.error(err.message, { hideAfter: hideAfterTimeSec });
		}
	}
}
