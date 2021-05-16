import {call, put, takeLatest} from '@redux-saga/core/effects';
import actionTypes from 'redux/actionTypes';
import serviceBase from 'services/serviceBase';
import {get, post, putUpdate} from 'services/serviceHandle';
import _ from 'lodash';
import {convertObjectToQuery} from 'helpers/function';
import {getUserData} from './userSaga';
import {select} from 'redux-saga/effects';

function* getListTours(payload?: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const {_id} = yield select((state) => state.userReducer.data);
  const url = serviceBase.url.tour;
  try {
    const {response} = yield call(get, url, {_id});
    if (response.error) {
      yield put({
        type: actionTypes.GET_TOURS_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
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

function* getDetailTour(payload?: any) {
  const id = payload?.id;
  const onFailed = payload?.callbacks?.onFailed;
  const url = `${serviceBase.url.tour}${id}`;
  try {
    const {response} = yield call(get, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.GET_DETAIL_TOUR_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      yield put({
        type: actionTypes.GET_DETAIL_TOUR_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_DETAIL_TOUR_FAILED,
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
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
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
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      yield put({
        type: actionTypes.BOOKING_TOURS_SUCCESS,
      });
      yield getListTours();
      yield getDetailTour({id: payload.body.id});
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
  const userId = payload?.body?.userId;
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;

  const url = `${serviceBase.url.cancel}${convertObjectToQuery(payload.body)}`;
  try {
    const {response} = yield call(putUpdate, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.CANCEL_BOOKING_TOURS_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      yield put({
        type: actionTypes.CANCEL_BOOKING_TOURS_SUCCESS,
      });
      yield getListTours();
      yield getUserData();
      yield listBookingByUserTour({id: userId});
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

function* listBookingByUserTour(payload?: any) {
  const {_id} = yield select((state) => state.userReducer.data);
  const userId = payload?.id;
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;
  const body = {user_id: userId ? userId : _id};
  const url = `${serviceBase.url.allBooking}${convertObjectToQuery(body)}`;

  try {
    const {response} = yield call(get, url, {});

    if (response.error) {
      yield put({
        type: actionTypes.LIST_BOOKING_BY_ID_USER_FAILED,
        error: response.dataFailed.message,
      });

      onFailed && onFailed(response.dataFailed.message);
    } else {
      yield put({
        type: actionTypes.LIST_BOOKING_BY_ID_USER_SUCCESS,
        data: response.data,
      });
      onSuccess && onSuccess();
    }
  } catch (error) {
    yield put({
      type: actionTypes.LIST_BOOKING_BY_ID_USER_FAILED,
    });
    console.log({error});

    onFailed && onFailed(error.message);
  }
}

function* listBookingAll(payload?: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const onSuccess = payload?.callbacks?.onSuccess;

  const url = serviceBase.url.allBooking;
  try {
    const {response} = yield call(get, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.LIST_BOOKING_ALL_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      yield put({
        type: actionTypes.LIST_BOOKING_ALL_SUCCESS,
        data: response.data,
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
  yield takeLatest(actionTypes.GET_DETAIL_TOUR_REQUEST, getDetailTour);
  yield takeLatest(actionTypes.SEARCH_TOURS_REQUEST, searchTours);
  yield takeLatest(actionTypes.BOOKING_TOURS_REQUEST, bookingTour);
  yield takeLatest(actionTypes.CANCEL_BOOKING_TOURS_REQUEST, cancelBookingTour);
  yield takeLatest(actionTypes.LIST_BOOKING_ALL_REQUEST, listBookingAll);
  yield takeLatest(
    actionTypes.LIST_BOOKING_BY_ID_USER_REQUEST,
    listBookingByUserTour,
  );
}
