import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { defaultTheme, oppositeTheme } from 'ui-kit/src/Theme';

const themes = [defaultTheme, oppositeTheme];
addDecorator(withThemesProvider(themes));

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};
