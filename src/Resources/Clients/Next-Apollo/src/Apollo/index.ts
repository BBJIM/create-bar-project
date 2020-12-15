import { ApolloClient } from '@apollo/client';
import { isBrowser } from 'Common/Utils';
import { getToken } from 'Common/Utils/Cookies';
import { NextPageContext } from 'next';
import { useMemo } from 'react';
import cache from './Cache';
import { resolvers } from './Resolvers';

let apolloClient: ApolloClient<any>;

const createApolloClient = (ctx?: NextPageContext, initialState?: any) => {
	return new ApolloClient({
		ssrMode: true,
		uri: process.env.NEXT_PUBLIC_SERVER_API_URL,
		headers: { Authorization: `Bearer ${getToken(ctx)}` },
		resolvers,
		cache: cache.restore(initialState || {}),
	});
};

export const initializeApollo = (initialState: any = null, ctx?: NextPageContext) => {
	const _apolloClient = apolloClient ?? createApolloClient(ctx, initialState);
	if (!isBrowser()) return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
};

export const useApollo = (initialState: any) => {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
};
