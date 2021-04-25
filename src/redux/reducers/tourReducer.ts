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
    case actionTypes.GET_TOURS_REQUEST:
      return {
        ...state,
        error: '',
      };
    case actionTypes.GET_TOURS_SUCCESS:
      return {
        ...state,
        data: [...action.data],
        error: '',
      };
    case actionTypes.GET_TOURS_FAILED:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
