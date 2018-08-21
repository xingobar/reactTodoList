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

const middleware = compose(applyMiddleware(thunk), window.devToolsExtension && window.devToolsExtension());

let store = createStore(todoReducer, middleware);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
