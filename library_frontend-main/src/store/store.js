import { thunk } from 'redux-thunk';
import { applyMiddleware, legacy_createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
