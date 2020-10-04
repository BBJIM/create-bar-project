import { CookieAttributes, get, remove, set } from 'js-cookie';

enum CookiesKeys {
	userToken = 'token',
}

// TODO: search about cookies and make this more secured
export const saveToken = (token: string, rememberMe: boolean = true) => {
	if (rememberMe) {
		setCookie(CookiesKeys.userToken, token, { expires: 9999 });
	} else {
		// In case of rememberMe = false, the cookie is saved for the current session only
		setCookie(CookiesKeys.userToken, token);
	}

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
