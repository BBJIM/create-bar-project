import { useQuery } from '@apollo/client';
import { alertMessage, alertStrings } from 'Common/AlertMessage';
import { ADMIN } from 'Common/GeneralConsts';
import { ROUTES } from 'Common/RoutesNames';
import { useAuthQuery } from 'Logic/Auth';
import { GET_UI_STATE } from 'Logic/UI';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type Props = RouteProps;

const AdminRoute = ({ ...rest }: Props) => {
	const { data: uiData } = useQuery(GET_UI_STATE);
	const { blockedUiState } = uiData;
	const currentUserState = useAuthQuery();
	const isAdmin = blockedUiState || currentUserState?.role?.name === ADMIN;
	useEffect(() => {
		if (!isAdmin) {
			alertMessage.error(alertStrings.noAccess);
		}
	});
	if (!isAdmin) {
		return <Redirect to={ROUTES.HOME.path} />;
	}

	return <Route {...rest} />;
};

export default AdminRoute;
