import { defaultColors } from 'Theme/colors';
import { typography } from 'Theme/GlobalStyles';

export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Sizes = keyof typeof typography.headers.sizes;

export type FontWeights = keyof typeof typography.fontWeights;

export type Colors = keyof typeof defaultColors;
