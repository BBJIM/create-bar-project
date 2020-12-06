import { defaultTheme, oppositeTheme } from 'ui-kit/src/Theme';

export const themes = {
	defaultTheme,
	oppositeTheme,
};

export type themeKey = keyof typeof themes;
export const themeKeysArr = Object.keys(themes) as themeKey[];
