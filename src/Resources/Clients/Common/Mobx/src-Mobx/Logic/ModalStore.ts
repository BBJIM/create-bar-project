import { action, computed, IObservableArray, observable } from 'mobx';

interface ModalItem {
	component?: any;
	header?: string;
	titleComponent?: any;
	onCloseAction?: () => any;
}

export default class ModalStore {
	@observable
	private open = false;

	@observable
	private modalStack: IObservableArray<ModalItem> = observable([]);

	@computed
	public get isOpen(): boolean {
		return this.open;
	}

	@computed
	public get lastModalItem(): ModalItem {
		return this.modalStack[this.modalStack.length - 1];
	}

	@computed
	public get length(): number {
		return this.modalStack.length;
	}

	@action
	public openModal(modalItem: ModalItem): void {
		this.open = true;
		this.modalStack.push(modalItem);
	}

	@action
	public closeModal = (): void => {
		const onCloseAction = this.lastModalItem && this.lastModalItem.onCloseAction;
		if (onCloseAction) {
			onCloseAction();
		}
		this.open = false;
		this.modalStack.clear();
	};

	@action
	public popModal = (): void => {
		this.modalStack.pop();
	};
}
