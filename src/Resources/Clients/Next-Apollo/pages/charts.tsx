import { initializeApollo } from 'Apollo';
import { useAdminRoute } from 'Common/Hooks';
import { Charts } from 'Containers';
import { GET_AUTH_STATE } from 'Logic/Auth';
import { NextPageContext } from 'next';
import React from 'react';

const ChartsPage = () => {
	return <Charts />;
};

ChartsPage.getInitialProps = async (ctx: NextPageContext) => {
	const apolloClient = initializeApollo();
	const { data: authData } = await apolloClient.query({
		query: GET_AUTH_STATE,
	});
	useAdminRoute({ ctx, authData });
	return {
		loggedIn: true,
	};
};

export default ChartsPage;
