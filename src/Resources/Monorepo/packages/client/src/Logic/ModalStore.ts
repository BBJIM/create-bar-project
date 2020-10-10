import { action, computed, IObservableArray, observable } from 'mobx';

interface IModalItem {
	component?: any;
	header?: string;
	titleComponent?: any;
	onCloseAction?: () => any;
}

export default class ModalStore {
	@observable
	private open = false;

	@observable
	private modalStack: IObservableArray<IModalItem> = observable([]);

	@computed
	public get isOpen() {
		return this.open;
	}

	@computed
	public get lastModalItem() {
		return this.modalStack[this.modalStack.length - 1];
	}

	@computed
	public get length() {
		return this.modalStack.length;
	}

	@action
	public openModal(modalItem: IModalItem) {
		this.open = true;
		this.modalStack.push(modalItem);
	}

	@action
	public closeModal = () => {
		const onCloseAction = this.lastModalItem && this.lastModalItem.onCloseAction;
		if (onCloseAction) {
			onCloseAction();
		}
		this.open = false;
		this.modalStack.clear();
	};

	@action
	public popModal = () => {
		this.modalStack.pop();
	};
}
