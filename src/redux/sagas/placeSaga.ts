import {call, put, takeLatest} from '@redux-saga/core/effects';
import actionTypes from 'redux/actionTypes';
import serviceBase from 'services/serviceBase';
import {get} from 'services/serviceHandle';
import _ from 'lodash';

function* getListPlace(payload?: any) {
  const onFailed = payload?.callbacks?.onFailed;
  const url = serviceBase.url.place;
  try {
    const {response} = yield call(get, url, '');
    if (response.error) {
      yield put({
        type: actionTypes.GET_PLACE_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      yield put({
        type: actionTypes.GET_PLACE_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_PLACE_FAILED,
      error: error.message,
    });
  }
}
export default function* () {
  yield takeLatest(actionTypes.GET_PLACE_REQUEST, getListPlace);
}
