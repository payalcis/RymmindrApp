import './index.css';
import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker, { unregister } from './registerServiceWorker'
import rootReducer from './store/reducers';
import {composeWithDevTools} from 'redux-devtools-extension/';

import thunk from 'redux-thunk';

//const store = createStore(rootReducer, applyMiddleware(thunk));

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)


const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
//askForPermissioToReceiveNotifications();
// initializeFirebase();
//askForPermissioToReceiveNotifications();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//registerServiceWorker.unregister();
unregister();
