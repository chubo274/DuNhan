import {call, put, takeLatest} from '@redux-saga/core/effects';
import actionTypes from 'redux/actionTypes';
import serviceBase from 'services/serviceBase';
import {get, post, putUpdate} from 'services/serviceHandle';
import _ from 'lodash';
import {convertObjectToQuery} from 'helpers/function';
import {getUserData} from './userSaga';

function* getListTours() {
  const url = serviceBase.url.tour;
  try {
    const {response} = yield call(get, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.GET_TOURS_FAILED,
        error: response.errorMessage,
      });
    } else {
      yield put({
        type: actionTypes.GET_TOURS_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_TOURS_FAILED,
      error: error.message,
    });
  }
}

function* searchTours(payload: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;
  const url = `${serviceBase.url.searchTour}${convertObjectToQuery(
    payload.body,
  )}`;
  try {
    const {response} = yield call(post, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.SEARCH_TOURS_FAILED,
        error: response.errorMessage,
      });
      onFailed && onFailed();
    } else {
      yield put({
        type: actionTypes.SEARCH_TOURS_SUCCESS,
      });
      onSuccess && onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.SEARCH_TOURS_FAILED,
      error: error.message,
    });
    onFailed && onFailed();
  }
}

function* bookingTour(payload: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;
  const body = {...payload.body};
  delete body.id;

  const url = `${serviceBase.url.booking}${payload.body.id}`;
  try {
    const {response} = yield call(putUpdate, url, body);
    if (response.error) {
      yield put({
        type: actionTypes.BOOKING_TOURS_FAILED,
        error: response.errorMessage,
      });
      onFailed && onFailed();
    } else {
      yield put({
        type: actionTypes.BOOKING_TOURS_SUCCESS,
      });
      yield getListTours();
      yield getUserData();
      onSuccess && onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.BOOKING_TOURS_FAILED,
      error: error.message,
    });
    onFailed && onFailed();
  }
}

function* cancelBookingTour(payload: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;
  const url = `${serviceBase.url.booking}${convertObjectToQuery(payload.body)}`;
  try {
    const {response} = yield call(post, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.CANCEL_BOOKING_TOURS_FAILED,
        error: response.errorMessage,
      });
      onFailed && onFailed();
    } else {
      yield put({
        type: actionTypes.CANCEL_BOOKING_TOURS_SUCCESS,
      });
      getListTours();
      onSuccess && onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.CANCEL_BOOKING_TOURS_FAILED,
      error: error.message,
    });
    onFailed && onFailed();
  }
}

function* listBookingByUserTour(payload: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;

  const url = `${serviceBase.url.allBooking}${convertObjectToQuery(
    payload.body,
  )}`;

  try {
    const {response} = yield call(get, url, {});

    if (response.error) {
      yield put({
        type: actionTypes.LIST_BOOKING_BY_ID_USER_FAILED,
        error: response.errorMessage,
      });
      onFailed && onFailed();
    } else {
      yield put({
        type: actionTypes.LIST_BOOKING_BY_ID_USER_SUCCESS,
        data: response.data,
      });
      onSuccess && onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.LIST_BOOKING_BY_ID_USER_FAILED,
      error: error.message,
    });
    onFailed && onFailed();
  }
}

function* listBookingAll(payload: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;
  const body = {...payload.body};
  delete body.id;

  const url = `${serviceBase.url.booking}${payload.body.id}`;
  try {
    const {response} = yield call(putUpdate, url, body);
    if (response.error) {
      yield put({
        type: actionTypes.LIST_BOOKING_ALL_FAILED,
        error: response.errorMessage,
      });
      onFailed && onFailed();
    } else {
      yield put({
        type: actionTypes.LIST_BOOKING_ALL_SUCCESS,
      });
      onSuccess && onSuccess(response.data);
    }
  } catch (error) {
    yield put({
      type: actionTypes.LIST_BOOKING_ALL_FAILED,
      error: error.message,
    });
    onFailed && onFailed();
  }
}

export default function* () {
  yield takeLatest(actionTypes.GET_TOURS_REQUEST, getListTours);
  yield takeLatest(actionTypes.SEARCH_TOURS_REQUEST, searchTours);
  yield takeLatest(actionTypes.BOOKING_TOURS_REQUEST, bookingTour);
  yield takeLatest(actionTypes.CANCEL_BOOKING_TOURS_REQUEST, cancelBookingTour);
  yield takeLatest(actionTypes.LIST_BOOKING_ALL_REQUEST, listBookingAll);
  yield takeLatest(
    actionTypes.LIST_BOOKING_BY_ID_USER_REQUEST,
    listBookingByUserTour,
  );
}
