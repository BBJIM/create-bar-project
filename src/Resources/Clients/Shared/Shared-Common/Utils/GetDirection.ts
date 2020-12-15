import { directions } from 'Common/GeneralConsts';
import { isBrowser } from './NextjsProcessUtils';

const getDirection = (): string => {
	if (isBrowser()) {
		return window.getComputedStyle(document.body).direction;
	}
	return directions.ltr;
};
export default getDirection;
