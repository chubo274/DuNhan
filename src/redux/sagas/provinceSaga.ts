import {call, put, takeLatest} from '@redux-saga/core/effects';
import actionTypes from 'redux/actionTypes';
import serviceBase from 'services/serviceBase';
import {get} from 'services/serviceHandle';
import _ from 'lodash';

function* getListProvince() {
  const url = serviceBase.url.province;
  try {
    const {response} = yield call(get, url, '');    
    if (response.error) {
      yield put({
        type: actionTypes.GET_PROVINCE_FAILED,
        error: response.errorMessage,
      });
    } else {
      yield put({
        type: actionTypes.GET_PROVINCE_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_PROVINCE_FAILED,
      error: error.message,
    });
  }
}
export default function* () {
  yield takeLatest(actionTypes.GET_PROVINCE_REQUEST, getListProvince);
}
