import { Theme } from 'ui-kit/src/Theme';

export const getMinDesktopSize = ({ theme }: { theme: Theme }): string => theme.mediaSizes.desktopMinSize;

export const getMaxMobileSize = ({ theme }: { theme: Theme }): string => theme.mediaSizes.mobileMaxSize;
