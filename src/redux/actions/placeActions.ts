import actionTypes from 'redux/actionTypes';

const getListPlace = (callbacks?: any) => {
  return {
    type: actionTypes.GET_PLACE_REQUEST,
    callbacks,
  };
};

export default {getListPlace};
