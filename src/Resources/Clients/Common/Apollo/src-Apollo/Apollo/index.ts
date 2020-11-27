import { ApolloClient } from '@apollo/client';
import { getToken } from 'Common/Utils/Cookies';
import cache from './Cache';
import { resolvers } from './Resolvers';

const client = new ApolloClient({
	uri: process.env.REACT_APP_SERVER_API_URL,
	headers: { Authorization: `Bearer ${getToken()}` },
	cache,
	resolvers,
});

export default client;
