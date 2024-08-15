// reducer.js
import * as actionTypes from '../actionTypes/authActionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoginConfirm: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, loading: true, error: null, isLoginConfirm: null };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null, isLoginConfirm: null };
    case actionTypes.LOGIN_FAILURE:
      return { ...state, loading: false, user: null, error: action.payload, isLoginConfirm: null };
    case actionTypes.LOGOUT:
      return { ...state, user: null, error: null, isLoginConfirm: null };
    case actionTypes.LOGIN_CONFIRM:
      return { ...state, isLoginConfirm: true };
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default authReducer;
