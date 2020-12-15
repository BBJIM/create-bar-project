import { AUTH_STORE, GENERIC_STORE, MODAL_STORE, UI_STORE } from 'Common/StoreNames';
import { isNullOrUndefined } from 'Common/Utils';
import { AuthStore, GenericStore, ModalStore, UiStore } from './Stores';

let stores: any;

export const initializeStores = (isServer: boolean, initialData?: any) => {
	if (isServer || isNullOrUndefined(stores)) {
		const genericStore = new GenericStore();
		const uiStore = new UiStore();
		const modalStore = new ModalStore();
		const authStore = new AuthStore(genericStore, initialData?.[AUTH_STORE]);
		stores = {
			[AUTH_STORE]: authStore,
			[GENERIC_STORE]: genericStore,
			[MODAL_STORE]: modalStore,
			[UI_STORE]: uiStore,
		};
	}

	return stores;
};

export default initializeStores;
