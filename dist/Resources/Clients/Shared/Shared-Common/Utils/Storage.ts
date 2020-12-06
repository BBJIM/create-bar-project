const StorageKeys = {
	theme: 'theme',
};

type StorageKey = keyof typeof StorageKeys;

export const getStorageItem = (name: StorageKey): string | null => {
	return localStorage.getItem(name);
};

export const clearStorageItem = (name: StorageKey): void => {
	localStorage.removeItem(name);
};

/**
 * @param name StorageKey name
 * @param value value of the name
 */
export const setStorageItem = (name: StorageKey, value: string): void => {
	localStorage.setItem(name, value);
};
