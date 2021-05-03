import actionTypes from 'redux/actionTypes';

export interface IReducer {
  data: any[];
  error: string;
  listPlacesStart: any[];
}
const initialState: IReducer = {
  data: [],
  error: '',
  listPlacesStart: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_TOURS_REQUEST:
      return {
        ...state,
        error: '',
      };
    case actionTypes.GET_TOURS_SUCCESS:
      const newPlacesStart: any = [];
      action.data.map((el: any) => {
        if (newPlacesStart.indexOf(el?.place_start) === -1) {
          newPlacesStart.push(el?.place_start);
        }
      });
      return {
        ...state,
        data: [...action.data],
        error: '',
        listPlacesStart: newPlacesStart,
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
