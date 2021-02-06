import actionTypes from '../actionTypes';

/*
 * Reducer actions related with login
 */

export const loginRequest = (body: any, loginSocial?: boolean) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    body,
    loginSocial,
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
export const signUpRequest = (body: any) => {
  return {
    type: actionTypes.SIGN_UP_REQUEST,
    body,
  };
};

export const signUpFailed = (error: any) => {
  return {
    type: actionTypes.SIGN_UP_FAILED,
    error,
  };
};

export const signUpSuccess = (response: any) => {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    response,
  };
};

// logout
export const logOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};

// get user data

export const getUserData = (userId: any) => {
  return {
    type: actionTypes.GET_USER_DATA,
    userId,
  };
};

export const getUserDataSuccess = (response: any) => {
  return {
    type: actionTypes.GET_USER_DATA_SUCCESS,
    response,
  };
};

export const getUserDataFailed = (error: any) => {
  return {
    type: actionTypes.GET_USER_DATA_FAILED,
    error,
  };
};


// update user data
// add callbacks (18/12/2020)
export const updateUserData = (userId: any, param: any, callbacks: any) => {
  // const {first_name, email, age, address, profile_picture} = param;
  // param.user_profile = {address, profile_picture, age};
  // delete param.address;
  // delete param.profile_picture;
  // delete param.age;
  return {
    type: actionTypes.UPDATE_USER_DATA,
    param,
    userId,
    callbacks,
  };
};
