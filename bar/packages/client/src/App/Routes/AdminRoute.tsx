import { alertMessage, alertStrings } from 'Common/AlertMessage';
import { ADMIN } from 'Common/GeneralConsts';
import { ROUTES } from 'Common/RoutesNames';
import { AUTH_STORE, UI_STORE } from 'Common/StoreNames';
import { AuthStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps & { authStore?: AuthStore; uiStore?: UiStore };

const AdminRoute = inject(
	AUTH_STORE,
	UI_STORE,
)(
	observer(({ authStore, uiStore, ...rest }: Props) => {
		const isAdmin = uiStore?.getBlockedUi || authStore?.getCurrentUser?.role?.name === ADMIN;
		useEffect(() => {
			if (!isAdmin) {
				alertMessage.error(alertStrings.noAccess);
			}
		});
		if (!isAdmin) {
			return <Redirect to={ROUTES.HOME.path} />;
		}

		return <Route {...rest} />;
	}),
);

export default AdminRoute;
