import actionTypes from 'redux/actionTypes';

export interface IUserReducer {
  data?: {};
  isCreatingUser: boolean;
  errorCreatingUser: string;
}
const initialState: IUserReducer = {
  data: {},
  isCreatingUser: false,
  errorCreatingUser: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: {...state.data, ...action.response},
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        data: {},
        errorMessage: action.error,
      };

    case actionTypes.LOG_OUT:
      return {
        ...state,
        data: {},
        errorMessage: '',
      };

    case actionTypes.SIGN_UP_REQUEST: {
      return {
        ...state,
        isCreatingUser: true,
      };
    }
    case actionTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isCreatingUser: false,
        errorCreatingUser: undefined,
      };
    }
    case actionTypes.SIGN_UP_FAILED: {
      return {
        ...state,
        isCreatingUser: false,
        errorCreatingUser: action.error,
      };
    }

    default:
      return state;
  }
};
