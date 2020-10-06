import { CookieAttributes, get, remove, set } from 'js-cookie';

enum CookiesKeys {
	userToken = 'token',
}

export const saveToken = (token: string) => {
	setCookie(CookiesKeys.userToken, token, { expires: 9999 });
	return token;
};

export const getToken = () => {
	return getCookie(CookiesKeys.userToken);
};

export const removeToken = () => {
	return removeCookie(CookiesKeys.userToken);
};

export const removeCookie = (name: string) => {
	remove(name);
};

export const getCookie = (name: string) => {
	return get(name);
};

export const setCookie = (name: string, value: string, options?: CookieAttributes) => {
	return set(name, value, options);
};
