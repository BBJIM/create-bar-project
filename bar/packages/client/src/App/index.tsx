import { alertMessage, alertStrings, hideAfterTimeSec } from 'Common/AlertMessage';
import { AUTH_STORE, GENERIC_STORE, UI_STORE } from 'Common/StoreNames';
import { themeKey } from 'Common/Themes';
import { getStorageItem } from 'Common/Utils/Storage';
import { AuthStore, GenericStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Layout from './Layout';
import Routes from './Routes';

type Props = { uiStore?: UiStore; genericStore?: GenericStore; authStore?: AuthStore };

const App = inject(
	AUTH_STORE,
	GENERIC_STORE,
	UI_STORE,
)(
	observer(({ uiStore, authStore, genericStore }: Props) => {
		useEffect(() => {
			const currentTheme: themeKey = (getStorageItem('theme') as themeKey) || 'defaultTheme';
			uiStore?.setThemeByName(currentTheme);
			genericStore?.fetch('Role');
			authStore
				?.fetchCurrentUser()
				.then((result) => {
					if (result) {
						alertMessage.success(alertStrings.logInSuccess, { hideAfter: hideAfterTimeSec });
					}
					uiStore?.unBlockUI();
				})
				.catch(() => {
					alertMessage.error(alertStrings.logInError, { hideAfter: hideAfterTimeSec });
					uiStore?.unBlockUI();
				});
		}, [uiStore, authStore, genericStore]);

		return (
			<Layout>
				<Routes />
			</Layout>
		);
	}),
);

export default App;
