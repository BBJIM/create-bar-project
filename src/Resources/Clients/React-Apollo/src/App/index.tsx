import { useMutation, useQuery } from '@apollo/client';
import { alertMessage, alertStrings, hideAfterTimeSec } from 'Common/AlertMessage';
import { getStorageItem } from 'Common/Utils';
import { LOGIN, setCurrentUser } from 'Logic/Auth';
import { GET_ROLES } from 'Logic/Role';
import { setBlockedUi, setThemeByName } from 'Logic/UI';
import React, { useEffect } from 'react';
import { themeKey } from 'ui-kit/src/Common/Themes';
import Layout from './Layout';
import Routes from './Routes';

const App = () => {
	const [login] = useMutation(LOGIN);
	useQuery(GET_ROLES);
	useEffect(() => {
		const currentTheme: themeKey = (getStorageItem('theme') as themeKey) || 'defaultTheme';
		setThemeByName(currentTheme);
		login()
			.then(({ data }) => {
				if (data) {
					setCurrentUser(data.login);
					alertMessage.success(alertStrings.logInSuccess, { hideAfter: hideAfterTimeSec });
				}
				setBlockedUi(false);
			})
			.catch(() => {
				alertMessage.error(alertStrings.logInError, { hideAfter: hideAfterTimeSec });
				setBlockedUi(false);
			});
	}, [login]);

	return (
		<Layout>
			<Routes />
		</Layout>
	);
};

export default App;
