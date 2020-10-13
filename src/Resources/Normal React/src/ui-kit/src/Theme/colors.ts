import { darkerColor } from 'ui-kit/src/Common/Utils';

const PRIMARY = '#2baed2';
const SECONDARY = '#59e0c4';
const WHITE = '#ffffff';
const BLACK = '#000000';
const RED = '#dd3244';
const YELLOW = '#fcba40';
const GREEN = '#1faf73';
const GRAY = '#CCC';
const LIGHT_GREEN = '#4fc3a1';
const DARK_GRAY = '#726d6d';
const TRANSPARENT = 'transparent';

export interface IColors {
	primary: string;
	secondary: string;
	white: string;
	black: string;
	red: string;
	yellow: string;
	green: string;
	gray: string;
	lightGreen: string;
	darkGray: string;
	transparent: string;
	text: string;
	backgorund: string;
	disabled: string;
	placeholder: string;
	navbarBackgorund: string;
	navbarLink: string;
	navbarLinkHighlight: string;
	navbarSelectedLink: string;
	inputBackground: string;
	inputText: string;
	inputError: string;
	submit: string;
	dimmer: string;
}

export const staticColors = {
	primary: PRIMARY,
	secondary: SECONDARY,
	white: WHITE,
	black: BLACK,
	red: RED,
	yellow: YELLOW,
	green: GREEN,
	gray: GRAY,
	lightGreen: LIGHT_GREEN,
	darkGray: DARK_GRAY,
	transparent: TRANSPARENT,
	inputBackground: '#f2f2f2',
	inputText: '#3f3c3c',
	inputError: RED,
	dimmer: 'rgba(0, 0, 0, 0.75)',
	submit: darkerColor(PRIMARY, 0.1),
};

export const defaultColors: IColors = {
	text: BLACK,
	backgorund: WHITE,
	disabled: '#f0f0f0',
	placeholder: '#B4B4B4',
	navbarBackgorund: '#3f3c3c',
	navbarLink: '#dfe6e9',
	navbarLinkHighlight: PRIMARY,
	navbarSelectedLink: '#1d1a1a',
	...staticColors,
};

export const oppositeThemeColor: IColors = {
	text: WHITE,
	backgorund: '#1b1919',
	disabled: '#f0f0f0',
	placeholder: '#B4B4B4',
	navbarBackgorund: '#e9f0f3',
	navbarLink: '#272727',
	navbarLinkHighlight: PRIMARY,
	navbarSelectedLink: '#d6d6d6',
	...staticColors,
};
