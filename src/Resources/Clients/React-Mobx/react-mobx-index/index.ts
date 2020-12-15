import { AUTH_STORE, GENERIC_STORE, MODAL_STORE, UI_STORE } from 'Common/StoreNames';
import { AuthStore, GenericStore, ModalStore, UiStore } from '../../Common/Mobx/src-Mobx/Logic/Stores';

class Stores {
	private authStore: AuthStore;
	private uiStore: UiStore;
	private modalStore: ModalStore;
	private genericStore: GenericStore;

	constructor() {
		// Do this if you want the store to have all other stores
		// this.timerStore = new TimerStore(this);
		this.genericStore = new GenericStore();
		this.uiStore = new UiStore();
		this.modalStore = new ModalStore();
		this.authStore = new AuthStore(this.genericStore);
	}

	public getStores(): any {
		return {
			[AUTH_STORE]: this.authStore,
			[UI_STORE]: this.uiStore,
			[MODAL_STORE]: this.modalStore,
			[GENERIC_STORE]: this.genericStore,
		};
	}
}

const rootStore = new Stores();

export default rootStore.getStores();
