import * as actionTypes from '../actionTypes/authActionTypes';
import * as authServices from '../../services/authService';

export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
export const loginConfirm = () => ({
  type: actionTypes.LOGIN_CONFIRM,
});

export const loginUser =
  ({ email, password }) =>
  async dispatch => {
    dispatch(loginRequest());
    try {
      const user = await authServices.login(email, password);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

export const changePasswordRequest = () => ({
  type: actionTypes.CHANGE_PASSWORD_REQUEST,
});

export const changePasswordSuccess = () => ({
  type: actionTypes.CHANGE_PASSWORD_SUCCESS,
});

export const changePasswordFailure = error => ({
  type: actionTypes.CHANGE_PASSWORD_FAILURE,
  payload: error,
});

export const changeUserPassword = (currentPassword, newPassword) => async dispatch => {
  dispatch(changePasswordRequest());
  try {
    await authServices.changePassword(currentPassword, newPassword);
    dispatch(changePasswordSuccess());
  } catch (error) {
    dispatch(changePasswordFailure(error.message));
  }
};

export const clearError = error => ({
  type: actionTypes.CLEAR_ERROR,
  payload: error,
});
