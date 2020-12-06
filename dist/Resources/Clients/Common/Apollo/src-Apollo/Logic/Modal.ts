import { gql } from '@apollo/client';
import { modalStackVar, openVar } from 'Apollo/Vars';
import { ModalItem } from 'Common/Types';

export const openModal = (modalItem: ModalItem): void => {
	openVar(true);
	pushToModalStack(modalItem);
};

export const pushToModalStack = (modalItem: ModalItem): void => {
	modalStackVar([...modalStackVar(), modalItem]);
};

export const popFromModalStack = (): void => {
	const newArr = [...modalStackVar()];
	newArr.pop();
	modalStackVar([...newArr]);
};

export const closeModal = (): void => {
	openVar(false);
	modalStackVar([]);
};

export const GET_MODAL_STATE = gql`
	query getModalState {
		modalState @client
		modalStackState @client
	}
`;
