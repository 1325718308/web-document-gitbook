import {createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
// import thunk from 'redux-thunk'; // thunk 中间件
import createSagaMiddleware from 'redux-saga'; // saga 中间件
import mySaga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, enhancers);
sagaMiddleware.run(mySaga);
export default store;