import { ROUTES } from 'Common/RoutesNames';
import { ChangeTheme, Charts, Form, Homepage, NotFound, Table } from 'Containers';
import React from 'react';
import { Route, Switch } from 'react-router';
import AdminRoute from './AdminRoute';

const Routes = (): JSX.Element => {
	return (
		<Switch>
			{/* MAYBE DO DYNAMICLY? */}
			<Route exact path={ROUTES.HOME.path} component={Homepage} />
			<AdminRoute exact path={ROUTES.FORM.path} component={Form} />
			<AdminRoute exact path={ROUTES.TABLE.path} component={Table} />
			<AdminRoute exact path={ROUTES.CHARTS.path} component={Charts} />
			<AdminRoute exact path={ROUTES.THEME.path} component={ChangeTheme} />
			<Route component={NotFound} />
		</Switch>
	);
};

export default Routes;
