import actionTypes from '../actionTypes';

/*
 * Reducer actions related with login
 */

export const login = (data: any, callbacks: any) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    data,
    callbacks,
  };
};

export const logout = () => {
  return {type: actionTypes.LOG_OUT};
};

export const signUpAction = (data: any, callbacks: any) => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
    data,
    callbacks,
  };
};

export const getUserData = (data: any, callbacks: any) => {
  return {
    type: actionTypes.GET_USER_DATA_REQUEST,
    data,
    callbacks,
  };
};
