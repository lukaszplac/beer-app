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
import favReducer from './store/reducers/favReducer';

//uncomment this line if you want to see Redux store in development mode
//const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

//creating root reducer by combining 3 subreducers
const rootReducer = combineReducers({
    beer: beerReducer,
    modal: modalReducer,
    favs: favReducer
})

const store = createStore(
    rootReducer,
    
    //uncomment this line if you want to see Redux store in development mode
    //composeEnhancers(applyMiddleware(thunk))

    //comment this line if you want to see Redux store in development mode
    compose(applyMiddleware(thunk))
)

const app = (
    //providing store for react redux
    //wrapping app inside hoc BrowserRouter to provide react router functions
    <Provider store = {store}>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </Provider>
)


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
