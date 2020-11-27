import { alertMessage, alertStrings, hideAfterTimeSec } from 'Common/AlertMessage';
import { AUTH_STORE, GENERIC_STORE, UI_STORE } from 'Common/StoreNames';
import { getStorageItem } from 'Common/Utils/Storage';
import { AuthStore, GenericStore, UiStore } from 'Logic/Stores';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { themeKey } from 'ui-kit/src/Common/Themes';
import Layout from './Layout';

type Props = { children: any; uiStore?: UiStore; genericStore?: GenericStore; authStore?: AuthStore };

const App = inject(
	AUTH_STORE,
	GENERIC_STORE,
	UI_STORE,
)(
	observer(({ children, uiStore, authStore, genericStore }: Props) => {
		useEffect(() => {
			const currentTheme: themeKey = (getStorageItem('theme') as themeKey) || 'defaultTheme';
			uiStore?.setThemeByName(currentTheme);
			genericStore?.fetch('Role');
			if (authStore?.getCurrentUser) {
				alertMessage.success(alertStrings.logInSuccess, { hideAfter: hideAfterTimeSec });
			} else {
				alertMessage.error(alertStrings.logInError, { hideAfter: hideAfterTimeSec });
			}
			uiStore?.unBlockUI();
		}, [uiStore, authStore, genericStore]);

		return <Layout>{children}</Layout>;
	}),
);

export default App;
