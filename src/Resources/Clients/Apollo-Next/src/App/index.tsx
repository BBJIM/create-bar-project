import { getStorageItem } from 'Common/Utils/Storage';
import { setThemeByName } from 'Logic/UI';
import React, { useEffect } from 'react';
import { themeKey } from 'ui-kit/src/Common/Themes';
import Layout from './Layout';

type Props = { children: any };

const App = ({ children }: Props) => {
	useEffect(() => {
		const currentTheme: themeKey = (getStorageItem('theme') as themeKey) || 'defaultTheme';
		setThemeByName(currentTheme);
	}, []);

	return <Layout>{children}</Layout>;
};

export default App;
