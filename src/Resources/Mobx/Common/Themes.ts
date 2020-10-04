import { defaultTheme, oppositeTheme } from 'Theme';

export const themes = {
	defaultTheme,
	oppositeTheme,
};

export type themeKey = keyof typeof themes;
export const themeKeysArr = Object.keys(themes) as themeKey[];
