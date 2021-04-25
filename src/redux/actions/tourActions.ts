import actionTypes from 'redux/actionTypes';

const getListTours = () => {
  return {
    type: actionTypes.GET_TOURS_REQUEST,
  };
};

const searchTours = (body: any, callback: any) => {
  return {
    type: actionTypes.SEARCH_TOURS_REQUEST,
    body,
    callback,
  };
};

export default {getListTours, searchTours};
