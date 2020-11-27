import { MOBX_STORE_KEY } from 'Common/GeneralConsts';
import { useAdminRoute } from 'Common/Hooks';
import { Charts } from 'Containers';
import { NextPageContext } from 'next';
import React from 'react';

const ChartsPage = () => <Charts />;

ChartsPage.getInitialProps = (ctx: NextPageContext) => {
	const { authStore } = (ctx as any)[MOBX_STORE_KEY];
	useAdminRoute({ ctx, authStore });
	return {
		loggedIn: true,
	};
};

export default ChartsPage;
