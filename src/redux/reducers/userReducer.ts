import actionTypes from 'redux/actionTypes';

export interface IUserReducer {
  data?: {};
  listAction: any[];
  listActionMommy: any[];
  type: string;
  errorMessage: string;
  template: any[];
  actual_date: any;
}
const initialState: IUserReducer = {
  type: '',
  data: {},
  listAction: [],
  listActionMommy: [],
  errorMessage: '',
  template: [],
  actual_date: undefined,
};

export default (state = initialState, action: any) => {
  state.type = action.type;
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
    case actionTypes.GET_USER_DATA_SUCCESS:
      return {
        ...state,
        data: {...state.data, ...action.response},
      };
    case actionTypes.GET_USER_DATA_FAILED:
      return {
        ...state,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};
