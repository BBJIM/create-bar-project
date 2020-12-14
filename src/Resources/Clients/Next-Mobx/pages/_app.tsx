import AppWrapper from 'App';
import { MOBX_STORE_KEY } from 'Common/GeneralConsts';
import { AUTH_STORE } from 'Common/StoreNames';
import { isBrowser } from 'Common/Utils';
import initializeStores from 'Logic';
import { AuthStore } from 'Logic/Stores';
import { Provider } from 'mobx-react';
import App, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';

class ProjectApp extends App {
	public static async getInitialProps(appContext: AppContext) {
		const isServer = !isBrowser();
		const mobxStores = initializeStores(isServer);

		const authStore: AuthStore = mobxStores[AUTH_STORE] as AuthStore;

		if (isServer) {
			await authStore?.fetchCurrentUser(appContext.ctx);
		}

		(appContext.ctx as any)[MOBX_STORE_KEY] = mobxStores;
		const appProps: AppInitialProps = await App.getInitialProps(appContext);
		return {
			...appProps,
			initialMobxState: mobxStores,
		};
	}

	private mobxStores: any;

	constructor(props: any) {
		super(props);
		const isServer = !isBrowser();
		this.mobxStores = isServer ? props.initialMobxState : initializeStores(isServer, props.initialMobxState);
	}

	public render() {
		const { Component, pageProps } = this.props;
		return (
			<Provider {...this.mobxStores}>
				<AppWrapper>
					<Component {...pageProps} />
				</AppWrapper>
			</Provider>
		);
	}
}

export default ProjectApp;
