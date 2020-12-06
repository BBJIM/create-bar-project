import { directions } from 'Common/GeneralConsts';

const getDirection = (): string => {
	if (typeof window !== 'undefined') {
		return window.getComputedStyle(document.body).direction;
	}
	return directions.ltr;
};
export default getDirection;
