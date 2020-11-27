import { modalStackVar, openVar, blockedUiVar, sidebarVar, themeVar, currentUserVar } from '../Vars';

const uiFields = {
	themeState: {
		read() {
			return themeVar();
		},
	},
	blockedUiState: {
		read() {
			return blockedUiVar();
		},
	},
	sidebarState: {
		read() {
			return sidebarVar();
		},
	},
};

const modalFields = {
	modalState: {
		read() {
			return openVar();
		},
	},
	modalStackState: {
		read() {
			return modalStackVar();
		},
	},
};

const authFields = {
	currentUserState: {
		read() {
			return currentUserVar();
		},
	},
};

const fields = {
	...uiFields,
	...modalFields,
	...authFields,
};

export default fields;
