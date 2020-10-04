import { useMediaQuery } from 'react-responsive';
import { mediaSizes } from 'Theme/GlobalStyles';

export const Desktop = ({ children }: { children: any }) => {
	const isDesktop = useMediaQuery({ minWidth: mediaSizes.desktopMinSize });
	return isDesktop ? children : null;
};

export const Mobile = ({ children }: { children: any }) => {
	const isMobile = useMediaQuery({ maxWidth: mediaSizes.mobileMaxSize });
	return isMobile ? children : null;
};
