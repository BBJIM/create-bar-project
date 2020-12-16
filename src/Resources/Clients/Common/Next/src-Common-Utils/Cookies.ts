import { CookieAttributes, get, remove, set } from 'js-cookie';
import { NextPageContext } from 'next';
import { isBrowser } from './IsBrowser';
import nextCookies from 'next-cookies';

enum CookiesKeys {
	userToken = 'token',
}

export const removeCookie = (name: string): void => {
	remove(name);
};

export const getCookie = (name: string, ctx?: NextPageContext): string | undefined => {
	if (isBrowser()) {
		return get(name);
	} else if (ctx) {
		const cookies = nextCookies(ctx);
		if (cookies && cookies[name]) {
			return cookies[name];
		}
	}
};

export const setCookie = (name: string, value: string, options?: CookieAttributes): string | undefined => {
	return set(name, value, options);
};

export const saveToken = (token: string): string => {
	setCookie(CookiesKeys.userToken, token, { expires: 9999 });
	return token;
};

export const getToken = (ctx?: NextPageContext): string | undefined => {
	return getCookie(CookiesKeys.userToken, ctx);
};

export const removeToken = (): void => {
	return removeCookie(CookiesKeys.userToken);
};
