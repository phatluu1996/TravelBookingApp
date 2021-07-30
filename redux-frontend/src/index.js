import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

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

