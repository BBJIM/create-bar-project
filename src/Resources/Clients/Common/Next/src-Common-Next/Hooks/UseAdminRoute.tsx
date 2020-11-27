import { alertMessage, alertStrings } from 'Common/AlertMessage';
import { ADMIN } from 'Common/GeneralConsts';
import { ROUTES } from 'Common/RoutesNames';
import { isBrowser } from 'Common/Utils';
import { AuthStore } from 'Logic/Stores';
import { NextPageContext } from 'next';
import Router from 'next/router';

type Props = {
	ctx: NextPageContext;
	authStore: AuthStore;
};

const useAdminRoute = ({ ctx, authStore }: Props) => {
	const isAdmin = authStore?.getCurrentUser?.role?.name === ADMIN;
	if (!isAdmin) {
		if (!isBrowser() && ctx.req && ctx.res) {
			ctx.res.writeHead(302, { Location: `${ROUTES.HOME.path}` });
			ctx.res.end();
		} else {
			alertMessage.error(alertStrings.noAccess);
			Router.push(`${ROUTES.HOME.path}`);
		}
	}
};

export default useAdminRoute;
