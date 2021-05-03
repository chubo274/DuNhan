import actionTypes from 'redux/actionTypes';

export interface IReducer {
  data: any[];
  error: string;
}
const initialState: IReducer = {
  data: [],
  error: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LIST_BOOKING_BY_ID_USER_REQUEST:
      return {
        ...state,
        error: '',
      };
    case actionTypes.LIST_BOOKING_BY_ID_USER_SUCCESS:
      return {
        ...state,
        data: [...action.data],
        error: '',
      };
    case actionTypes.LIST_BOOKING_BY_ID_USER_FAILED:
      return {
        ...state,
        error: action.error,
      };

    case actionTypes.LIST_BOOKING_ALL_REQUEST:
      return {
        ...state,
        error: '',
      };
    case actionTypes.LIST_BOOKING_ALL_SUCCESS:
      return {
        ...state,
        data: [...action.data],
        error: '',
      };
    case actionTypes.LIST_BOOKING_ALL_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
