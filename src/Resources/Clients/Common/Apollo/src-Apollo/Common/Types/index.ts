import { User } from 'Common/Models';

export interface ModalItem {
	component?: any;
	header?: string;
	titleComponent?: any;
	onCloseAction?: () => any;
}

export type LoginReturnValue = {
	data: { login: User };
};

export type RegisterReturnValue = {
	data: { register: User };
};
