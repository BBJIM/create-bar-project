import { CookieAttributes, get, remove, set } from 'js-cookie';

enum CookiesKeys {
	userToken = 'token',
}

export const removeCookie = (name: string): void => {
	remove(name);
};

export const getCookie = (name: string): string | undefined => {
	return get(name);
};

export const setCookie = (name: string, value: string, options?: CookieAttributes): string | undefined => {
	return set(name, value, options);
};

export const saveToken = (token: string): string => {
	setCookie(CookiesKeys.userToken, token, { expires: 9999 });
	return token;
};

export const getToken = (): string | undefined => {
	return getCookie(CookiesKeys.userToken);
};

export const removeToken = (): void => {
	return removeCookie(CookiesKeys.userToken);
};
