import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from 'Common/Utils/Cookies';

const API = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API_URL,
	responseType: 'json',
});

const addTokenToHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
	const token = getToken();
	if (token) {
		config.headers = { Authorization: `Bearer ${token}` };
	}
	return config;
};

const extractResponseData = (response: AxiosResponse): any => {
	if (response.data) {
		return response.data;
	}
	return response;
};

const extractResponseError = (error: { response: { data: { error: string } } }): never => {
	const errorMessage = error?.response?.data;
	if (errorMessage) {
		throw new Error(errorMessage?.error);
	}
	throw error;
};

API.interceptors.request.use(addTokenToHeader);

API.interceptors.response.use(extractResponseData, extractResponseError);

export default API;
