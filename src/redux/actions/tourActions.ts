import actionTypes from 'redux/actionTypes';

const getListTours = (callbacks?: any) => {
  return {
    type: actionTypes.GET_TOURS_REQUEST,
    callbacks,
  };
};

const getDetailTour = (id: any, callbacks?: any) => {
  return {
    type: actionTypes.GET_DETAIL_TOUR_REQUEST,
    id,
    callbacks,
  };
};

const searchTours = (body: any, callbacks: any) => {
  return {
    type: actionTypes.SEARCH_TOURS_REQUEST,
    body,
    callbacks,
  };
};

const userBookingTour = (body: any, callbacks: any) => {
  return {
    type: actionTypes.BOOKING_TOURS_REQUEST,
    body,
    callbacks,
  };
};

const cancelBookingTours = (body: any, callbacks?: any) => {
  return {
    type: actionTypes.CANCEL_BOOKING_TOURS_REQUEST,
    body,
    callbacks,
  };
};

const listBookingAllTours = (body?: any, callbacks?: any) => {
  return {
    type: actionTypes.LIST_BOOKING_ALL_REQUEST,
    body,
    callbacks,
  };
};

const listBookingByUserTours = (id?: any, callbacks?: any) => {
  return {
    type: actionTypes.LIST_BOOKING_BY_ID_USER_REQUEST,
    id,
    callbacks,
  };
};

export default {
  getListTours,
  searchTours,
  userBookingTour,
  cancelBookingTours,
  listBookingAllTours,
  listBookingByUserTours,
  getDetailTour,
};
