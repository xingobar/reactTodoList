import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import todoReducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import dotenv from 'dotenv';
import { composeWithDevTools } from 'redux-devtools-extension';

dotenv.load(); // load env file

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger());
}

// const middleware = compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension());

let store = createStore(todoReducer, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
