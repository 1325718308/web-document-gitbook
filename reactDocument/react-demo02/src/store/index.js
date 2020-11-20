import {createStore, combineReducers, applyMiddleware} from 'redux';
import courseTabListReducer from '../store/reducers/courseTabList';
import courseTabListState from '../store/states/courseTabList';
import thunk from 'redux-thunk';

const allRecuders = combineReducers({
    courseTabList: courseTabListReducer
});

const store = createStore(allRecuders, {
    courseTabList: courseTabListState
},applyMiddleware(thunk));
export default store;