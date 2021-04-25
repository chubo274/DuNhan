import {call, put, takeLatest} from '@redux-saga/core/effects';
import actionTypes from 'redux/actionTypes';
import serviceBase from 'services/serviceBase';
import {get, post} from 'services/serviceHandle';
import _ from 'lodash';
import {convertObjectToQuery} from 'helpers/function';

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
    console.log({response});

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
export default function* () {
  yield takeLatest(actionTypes.GET_TOURS_REQUEST, getListTours);
  yield takeLatest(actionTypes.SEARCH_TOURS_REQUEST, searchTours);
}
