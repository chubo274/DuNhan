import actionTypes from 'redux/actionTypes';

export interface IReducer {
  data: any[];
  listSuggest: any[];
  listSale: any[];
  listPlacesStart: any[];
  error: string;
}
const initialState: IReducer = {
  data: [],
  listSuggest: [],
  listSale: [],
  listPlacesStart: [],
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
      const newPlacesStart: any = [];
      action.data.Tour.map((el: any) => {
        if (newPlacesStart.indexOf(el?.place_start) === -1) {
          newPlacesStart.push(el?.place_start);
        }
      });
      return {
        ...state,
        data: [...action.data.Tour],
        listSuggest: [...action.data.listSuggest],
        listSale: [...action.data.listSale],
        listPlacesStart: newPlacesStart,
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
