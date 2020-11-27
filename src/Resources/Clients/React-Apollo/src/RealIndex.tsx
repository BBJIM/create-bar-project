import { ApolloProvider } from '@apollo/client/react';
import client from 'Apollo';
import App from 'App';
import history from 'App/Routes/history';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Router } from 'react-router-dom';

const Index = (): void => {
	ReactDOM.render(
		<ApolloProvider client={client}>
			<Router history={history}>
				<App />
			</Router>
		</ApolloProvider>,
		document.getElementById('root'),
	);
};

export default Index;
