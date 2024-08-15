// reducers/index.js
import { combineReducers } from 'redux';
import bookReducer from './booksReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  bookReducer,
  authReducer,
});

export default rootReducer;
