import { MOBX_STORE_KEY } from 'Common/GeneralConsts';
import { useAdminRoute } from 'Common/Hooks';
import { Table } from 'Containers';
import { NextPageContext } from 'next';
import React from 'react';

const TablePage = () => <Table />;

TablePage.getInitialProps = (ctx: NextPageContext) => {
	const { authStore } = (ctx as any)[MOBX_STORE_KEY];
	useAdminRoute({ ctx, authStore });
	return {
		loggedIn: true,
	};
};

export default TablePage;
