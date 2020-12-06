import { InMemoryCache } from '@apollo/client';
import fields from '../Fields';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields,
		},
	},
});

export default cache;
