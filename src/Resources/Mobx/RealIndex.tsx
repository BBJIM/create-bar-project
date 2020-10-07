import App from 'App';
import history from 'App/Routes/history';
import stores from 'Logic';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Router } from 'react-router-dom';

const Index = () => {
	ReactDOM.render(
		<Provider {...stores}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>,
		document.getElementById('root'),
	);
};

export default Index;
