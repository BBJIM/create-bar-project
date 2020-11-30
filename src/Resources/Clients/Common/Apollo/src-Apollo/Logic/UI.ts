import { gql } from '@apollo/client';
import { blockedUiVar, sidebarVar, themeVar } from 'Apollo/Vars';
import { setStorageItem } from 'Common/Utils';
import { themeKey, themes } from 'ui-kit/src/Common/Themes';

export const setThemeByName = (themeName: themeKey): void => {
	themeVar(themes[themeName]);
	setStorageItem('theme', themeName);
};

export const setBlockedUi = (value: boolean): void => {
	blockedUiVar(value);
};

export const setSidebar = (value: boolean): void => {
	sidebarVar(value);
};

export const GET_UI_STATE = gql`
	query getUiState {
		themeState @client
		blockedUiState @client
		sidebarState @client
	}
`;
