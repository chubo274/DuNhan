import {call, put, select, takeLatest} from 'redux-saga/effects';
import _ from 'lodash';
import actionTypes from 'redux/actionTypes';
import {get, post, putUpdate, setToken} from 'services/serviceHandle';
import serviceBase from 'services/serviceBase';

export function* refetchUser() {
  yield getUserData(null);
}

//* LOGIN
function* login(payload: any) {
  const url = serviceBase.url.login;
  const {data, callbacks} = payload;
  try {
    const {response} = yield call(post, url, data);
    if (response.error) {
      yield put({type: actionTypes.LOGIN_FAILED, error: response.errorMessage});
      callbacks &&
        callbacks.onFailed &&
        callbacks.onFailed(response.errorMessage);
    } else {
      callbacks && callbacks.onSuccess && callbacks.onSuccess();
      setToken(response.data.token);
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({type: actionTypes.LOGIN_FAILED, error: error.message});
    callbacks && callbacks.onFailed && callbacks.onFailed(error.message);
  }
}

//* SIGN UP
function* signUp(payload: any) {
  const url = serviceBase.url.user;
  const {data, callbacks} = payload;

  const body = {
    phone: data.phone.trim(),
    name: data.name.trim(),
    password: data.password,
    address: data.address.trim(),
  };
  try {
    const {response} = yield call(post, url, body);
    if (response.error) {
      yield put({
        type: actionTypes.SIGN_UP_FAILED,
        error: response.errorMessage,
      });
      callbacks &&
        callbacks.onFailed &&
        callbacks.onFailed(response.errorMessage);
    } else {
      //resfesh
      callbacks && callbacks.onSuccess && callbacks.onSuccess();
      yield put({type: actionTypes.SIGN_UP_SUCCESS});
    }
  } catch (error) {
    yield put({type: actionTypes.SIGN_UP_FAILED, error: error.message});
    callbacks && callbacks.onFailed && callbacks.onFailed(error.message);
  }
}

//* GET USER DATA
function* getUserData(payload: any) {
  const {_id} = yield select((state) => state.userReducer.data);
  const {callbacks} = payload;
  const url = `${serviceBase.url.user}${_id}`;
  try {
    const {response} = yield call(get, url, '');
    if (response.error) {
      yield put({
        type: actionTypes.GET_USER_DATA_FAILED,
        error: response.errorMessage,
      });
      callbacks &&
        callbacks.onFailed &&
        callbacks.onFailed(response.errorMessage);
    } else {
      //resfesh
      callbacks && callbacks.onSuccess && callbacks.onSuccess();
      yield put({
        type: actionTypes.GET_USER_DATA_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({type: actionTypes.GET_USER_DATA_FAILED, error: error.message});
    callbacks && callbacks.onFailed && callbacks.onFailed(error.message);
  }
}

//* UPDATE USER DATA
function* updateUserData(payload: any) {
  const {_id} = yield select((state) => state.userReducer.data);
  const {data, callbacks} = payload;
  const url = `${serviceBase.url.user}${_id}`;
  const body = {
    phone: data.phone.trim(),
    name: data.name.trim(),
    address: data.address.trim(),
  };
  try {
    const {response} = yield call(putUpdate, url, body);

    if (response.error) {
      yield put({
        type: actionTypes.UPDATE_USER_DATA_FAILED,
        error: response.errorMessage,
      });
      callbacks &&
        callbacks.onFailed &&
        callbacks.onFailed(response.errorMessage);
    } else {
      //resfesh
      yield refetchUser();
      yield put({
        type: actionTypes.UPDATE_USER_DATA_SUCCESS,
      });
      callbacks && callbacks.onSuccess && callbacks.onSuccess();
    }
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_USER_DATA_FAILED,
      error: error.message,
    });
    callbacks && callbacks.onFailed && callbacks.onFailed(error.message);
  }
}

export default function* () {
  yield takeLatest(actionTypes.LOGIN_REQUEST, login);
  yield takeLatest(actionTypes.SIGN_UP_REQUEST, signUp);
  yield takeLatest(actionTypes.GET_USER_DATA_REQUEST, getUserData);
  yield takeLatest(actionTypes.UPDATE_USER_DATA_REQUEST, updateUserData);
}
