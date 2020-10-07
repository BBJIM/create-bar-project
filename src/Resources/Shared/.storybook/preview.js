import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { defaultTheme, oppositeTheme } from 'Theme';

const themes = [defaultTheme, oppositeTheme];
addDecorator(withThemesProvider(themes));

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};