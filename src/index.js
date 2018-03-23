import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import beerReducer from './store/reducers/beerReducer';
import modalReducer from './store/reducers/modalReducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    beer: beerReducer,
    modal: modalReducer
})

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

const app = (
    <Provider store = {store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
