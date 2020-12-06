import { useCallback, useEffect, useState } from 'react';
import { mediaSizes } from 'ui-kit/src/Theme/GlobalStyles';

const useMediaQuery = ({ width, min }: { width: number; min?: boolean }) => {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((e: { matches: any }) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(${min ? 'min' : 'max'}-width: ${width}px)`);
		media.addEventListener('change', updateTarget);

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) {
			setTargetReached(true);
		}

		return () => media.removeEventListener('change', updateTarget);
	}, [min, updateTarget, width]);

	return targetReached;
};

export const Desktop = ({ children }: { children: JSX.Element }): JSX.Element | null => {
	const isDesktop = useMediaQuery({ width: mediaSizes.desktopMinSizeNumber, min: true });
	return isDesktop ? children : null;
};

export const Mobile = ({ children }: { children: JSX.Element }): JSX.Element | null => {
	const isMobile = useMediaQuery({ width: mediaSizes.mobileMaxSizeNumber });
	return isMobile ? children : null;
};
