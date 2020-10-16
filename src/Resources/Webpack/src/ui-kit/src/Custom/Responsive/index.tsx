import { useMediaQuery } from 'react-responsive';
import { mediaSizes } from 'ui-kit/src/Theme/GlobalStyles';

export const Desktop = ({ children }: { children: JSX.Element }): JSX.Element | null => {
	const isDesktop = useMediaQuery({ minWidth: mediaSizes.desktopMinSize });
	return isDesktop ? children : null;
};

export const Mobile = ({ children }: { children: JSX.Element }): JSX.Element | null => {
	const isMobile = useMediaQuery({ maxWidth: mediaSizes.mobileMaxSize });
	return isMobile ? children : null;
};