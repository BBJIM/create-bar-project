import { defaultColors, IColors, oppositeThemeColor } from './colors';
import { mediaSizes, modal, navbar, typography, zIndex } from './GlobalStyles';

type Typography = typeof typography;
type MediaSizes = typeof mediaSizes;
type Navbar = typeof navbar;
type Modal = typeof modal;
type ZIndex = typeof zIndex;

export interface ITheme {
	name: string;
	colors: IColors;
	typography: Typography;
	mediaSizes: MediaSizes;
	navbar: Navbar;
	modal: Modal;
	zIndex: ZIndex;
}

const staticTheme = {
	typography,
	mediaSizes,
	navbar,
	modal,
	zIndex,
};

export const defaultTheme: ITheme = {
	name: 'defaultTheme',
	colors: defaultColors,
	...staticTheme,
};

export const oppositeTheme: ITheme = {
	name: 'oppositeTheme',
	colors: oppositeThemeColor,
	...staticTheme,
};
