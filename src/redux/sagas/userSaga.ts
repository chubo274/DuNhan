import {put, call, takeLatest} from 'redux-saga/effects';
import _ from 'lodash';
import actionTypes from 'redux/actionTypes';
import {get, post, setToken} from 'services/serviceHandle';
import serviceBase from 'services/serviceBase';

function* login(payload: any) {
  const url = serviceBase.url.login;
  const {
    data,
    callbacks: {onSuccess, onFailed},
  } = payload;
  try {
    const response = yield call(post, url, data);
    if (response.error && !_.isEmpty(response.detail.error)) {
      yield put({type: actionTypes.LOGIN_FAILED, error: response.detail.error});
      onFailed && onFailed(response.detail.error);
    } else {
      //resfesh
      onSuccess && onSuccess();
      setToken(response.response.token);
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.response,
      });
    }
  } catch (error) {
    yield put({type: actionTypes.LOGIN_FAILED, error: error.message});
    onFailed && onFailed(error.message);
  }
}

function* signUp(payload: any) {
  const url = serviceBase.url.user;
  const {
    data,
    callbacks: {onSuccess, onFailed},
  } = payload;

  const body = {
    phone: data.phone.trim(),
    name: data.name.trim(),
    password: data.password,
    address: data.address.trim(),
  };
  try {
    const response = yield call(post, url, body);
    if (response.error && !_.isEmpty(response.detail.error)) {
      yield put({
        type: actionTypes.SIGN_UP_FAILED,
        error: response.detail.error,
      });
      onFailed && onFailed(response.detail.error);
    } else {
      //resfesh
      onSuccess && onSuccess();
      yield put({type: actionTypes.SIGN_UP_SUCCESS});
    }
  } catch (error) {
    yield put({type: actionTypes.SIGN_UP_FAILED, error: error.message});
    onFailed && onFailed(error.message);
  }
}

function* getUserData(payload: any) {
  const {
    callbacks: {onFailed, onSuccess},
  } = payload;
  const url = `${serviceBase.url.user}${payload.data.id}`;
  try {
    const response = yield call(get, url, '');

    if (response.error && !_.isEmpty(response.detail.error)) {
      yield put({type: actionTypes.GET_USER_DATA_FAILED, error: response.detail.error});
      onFailed && onFailed(response.detail.error);
    } else {
      //resfesh
      onSuccess && onSuccess();
      yield put({
        type: actionTypes.GET_USER_DATA_SUCCESS,
        data: response.response,
      });
    }
  } catch (error) {
    yield put({type: actionTypes.GET_USER_DATA_FAILED, error: error.message});
    onFailed && onFailed(error.message);
  }
}

export default function* () {
  yield takeLatest(actionTypes.LOGIN_REQUEST, login);
  yield takeLatest(actionTypes.SIGN_UP_REQUEST, signUp);
  yield takeLatest(actionTypes.GET_USER_DATA_REQUEST, getUserData);
}
