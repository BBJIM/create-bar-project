import { ApolloProvider } from '@apollo/client';
import { initializeApollo, useApollo } from 'Apollo';
import AppWrapper from 'App';
import { isBrowser } from 'Common/Utils';
import { LOGIN, setCurrentUser } from 'Logic/Auth';
import { setBlockedUi } from 'Logic/UI';
import App, { AppContext, AppInitialProps } from 'next/app';
import React, { useEffect } from 'react';

const ProjectApp = ({ Component, pageProps, initialApolloState, loginData }: any) => {
	const apolloClient = useApollo(initialApolloState);
	useEffect(() => {
		if (loginData) {
			setCurrentUser(loginData);
		}
		setBlockedUi(false);
	});
	return (
		<ApolloProvider client={apolloClient}>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</ApolloProvider>
	);
};

ProjectApp.getInitialProps = async (appContext: AppContext) => {
	const isServer = !isBrowser();
	const apolloClient = initializeApollo(null, appContext.ctx);
	let loginData;
	if (isServer) {
		try {
			const { data } = await apolloClient.mutate({ mutation: LOGIN });
			if (data) {
				setCurrentUser(data.login);
				loginData = data.login;
			}
		} catch (err) {}
	}
	const appProps: AppInitialProps = await App.getInitialProps(appContext);
	return {
		...appProps,
		initialApolloState: apolloClient.cache.extract(),
		loginData,
	};
};

export default ProjectApp;
