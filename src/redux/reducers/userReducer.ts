import actionTypes from 'redux/actionTypes';

export interface IUserReducer {
  data?: {};
  error: string;
}
const initialState: IUserReducer = {
  data: {},
  error: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    //* LOGIN
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: {...action.data},
        error: '',
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
      };

    //* LOGOUT
    case actionTypes.LOG_OUT:
      return {
        ...state,
        data: {},
        error: '',
      };

    //* GET USER DATA
    case actionTypes.GET_USER_DATA_REQUEST: {
      return {
        ...state,
        error: '',
      };
    }
    case actionTypes.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        data: {...action.data},
        error: '',
      };
    }
    case actionTypes.GET_USER_DATA_FAILED: {
      return {
        ...state,
        error: action.error,
      };
    }

    default:
      return state;
  }
};
