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
  const {data} = payload;
  const onSuccess = payload?.callbacks?.onSuccess;
  const onFailed = payload?.callbacks?.onFailed;
  try {
    const {response} = yield call(post, url, data);
    if (response.error) {
      yield put({
        type: actionTypes.LOGIN_FAILED,
        error: response.dataFailed.message,
      });

      onFailed && onFailed();
    } else {
      onSuccess && onSuccess();
      setToken(response.data.token);
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({type: actionTypes.LOGIN_FAILED, error: error.message});
    onFailed && onFailed(error.message);
  }
}

//* SIGN UP
function* signUp(payload: any) {
  const url = serviceBase.url.user;
  const {data} = payload;
  const onSuccess = payload?.callbacks?.onSuccess;
  const onFailed = payload?.callbacks?.onFailed;
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
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
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

//* GET USER DATA
export function* getUserData(payload?: any) {
  const {_id} = yield select((state) => state.userReducer.data);
  const url = `${serviceBase.url.user}${_id}`;
  const onSuccess = payload?.callbacks?.onSuccess;
  const onFailed = payload?.callbacks?.onFailed;
  try {
    const {response} = yield call(get, url, {});
    if (response.error) {
      yield put({
        type: actionTypes.GET_USER_DATA_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      //resfesh
      onSuccess && onSuccess();
      yield put({
        type: actionTypes.GET_USER_DATA_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({type: actionTypes.GET_USER_DATA_FAILED, error: error.message});
    onFailed && onFailed(error.message);
  }
}

//* UPDATE USER DATA
function* updateUserData(payload: any) {
  const {_id} = yield select((state) => state.userReducer.data);
  const {data} = payload;
  const onSuccess = payload?.callbacks?.onSuccess;
  const onFailed = payload?.callbacks?.onFailed;

  const url = `${serviceBase.url.user}${_id}`;
  try {
    const {response} = yield call(putUpdate, url, data);

    if (response.error) {
      yield put({
        type: actionTypes.UPDATE_USER_DATA_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      //resfesh
      yield refetchUser();
      yield put({
        type: actionTypes.UPDATE_USER_DATA_SUCCESS,
      });
      onSuccess && onSuccess();
    }
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_USER_DATA_FAILED,
      error: error.message,
    });
    onFailed && onFailed(error.message);
  }
}

function* forgotPass(payload: any) {
  const {data} = payload;
  const onSuccess = payload?.callbacks?.onSuccess;
  const onFailed = payload?.callbacks?.onFailed;

  const url = serviceBase.url.forGotPass;
  try {
    const {response} = yield call(post, url, data);

    if (response.error) {
      yield put({
        type: actionTypes.FORGOT_PASS_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      //resfesh
      yield put({
        type: actionTypes.FORGOT_PASS_SUCCESS,
      });
      onSuccess && onSuccess();
    }
  } catch (error) {
    yield put({
      type: actionTypes.FORGOT_PASS_FAILED,
      error: error.message,
    });
    onFailed && onFailed(error.message);
  }
}

//* GET ALL USER DATA
export function* getAllUserData(payload?: any) {
  const url = serviceBase.url.user;
  const onSuccess = payload?.callbacks?.onSuccess;
  const onFailed = payload?.callbacks?.onFailed;
  try {
    const {response} = yield call(get, url, {role: 'User'});
    if (response.error) {
      yield put({
        type: actionTypes.GET_ALL_USER_DATA_FAILED,
        error: response.dataFailed.message,
      });
      onFailed && onFailed(response.dataFailed.message);
    } else {
      //resfesh
      onSuccess && onSuccess();
      yield put({
        type: actionTypes.GET_ALL_USER_DATA_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_ALL_USER_DATA_FAILED,
      error: error.message,
    });
    onFailed && onFailed(error.message);
  }
}

export default function* () {
  yield takeLatest(actionTypes.LOGIN_REQUEST, login);
  yield takeLatest(actionTypes.SIGN_UP_REQUEST, signUp);
  yield takeLatest(actionTypes.GET_USER_DATA_REQUEST, getUserData);
  yield takeLatest(actionTypes.UPDATE_USER_DATA_REQUEST, updateUserData);
  yield takeLatest(actionTypes.FORGOT_PASS_REQUEST, forgotPass);
  yield takeLatest(actionTypes.GET_ALL_USER_DATA_REQUEST, getAllUserData);
}
