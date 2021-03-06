import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';


const enhancers = [];
enhancers.push(applyMiddleware(thunk));
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const store = createStore(reducers, composeEnhancers(...enhancers));
// const theme = createMuiTheme();
const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
         <App id="main-app"/>
        </Provider>
    </Router>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

