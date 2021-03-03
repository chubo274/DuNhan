import actionTypes from '../actionTypes';

/*
 * Reducer actions related with login
 */

export const loginRequest = (body: any) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    body,
  };
};

export const loginFailed = (error: any) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error,
  };
};

export const loginSuccess = (response: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    response,
  };
};

// signUp
export const signUpAction = (data: any, callbacks: any) => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
    data,
    callbacks,
  };
};
