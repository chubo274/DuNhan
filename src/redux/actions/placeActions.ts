import actionTypes from 'redux/actionTypes';

const getListPlace = () => {
  return {
    type: actionTypes.GET_PLACE_REQUEST,
  };
};

export default {getListPlace};
