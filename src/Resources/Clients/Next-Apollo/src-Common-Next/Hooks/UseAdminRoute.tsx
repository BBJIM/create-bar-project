import { alertMessage, alertStrings } from 'Common/AlertMessage';
import { ADMIN } from 'Common/GeneralConsts';
import { ROUTES } from 'Common/RoutesNames';
import { isBrowser } from 'Common/Utils';
import { NextPageContext } from 'next';
import Router from 'next/router';

type Props = {
	ctx: NextPageContext;
	authData: any;
};

const useAdminRoute = ({ ctx, authData }: Props) => {
	const { currentUserState } = authData ? authData : { currentUserState: null };
	const isAdmin = currentUserState?.role?.name === ADMIN;
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
