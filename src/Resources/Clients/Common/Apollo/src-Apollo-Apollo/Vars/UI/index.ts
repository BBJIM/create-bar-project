import { makeVar } from '@apollo/client';
import { defaultTheme } from 'ui-kit/src/Theme';

export const themeVar = makeVar(defaultTheme);
export const blockedUiVar = makeVar(true);
export const sidebarVar = makeVar(false);
