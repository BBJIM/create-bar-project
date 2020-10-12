import { defaultTheme, oppositeTheme } from '@bar/ui-kit/src/Theme';

export const themes = {
	defaultTheme,
	oppositeTheme,
};

export type themeKey = keyof typeof themes;
export const themeKeysArr = Object.keys(themes) as themeKey[];
