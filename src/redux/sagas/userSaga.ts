import {put, call, takeLatest} from 'redux-saga/effects';
import * as userActions from '../actions/userActions';
import _ from 'lodash';
import actionTypes from 'redux/actionTypes';
import {post} from 'services/serviceHandle';
import serviceBase from 'services/serviceBase';
import userServices from 'services/userServices';

function* login(payload: any) {
  const url = serviceBase.url.user;
  const {phone, password} = payload;
  const body = {phone, password};
  try {
    const {response} = yield call(post, url, body);
  } catch (error) {}
}

function* signUp(payload: any) {
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
    const {response} = yield userServices.signUpUser(body);
    if (response.error && !_.isEmpty(response.error)) {
      yield put({type: actionTypes.SIGN_UP_FAILED, error: response.error});
      onFailed && onFailed(response.error);
    } else {
      //resfesh
      onSuccess && onSuccess();
      yield put({type: actionTypes.SIGN_UP_SUCCESS});
    }
  } catch (error) {
    yield put({type: actionTypes.SIGN_UP_FAILED, error: error});
  }
}

export default function* () {
  yield takeLatest(actionTypes.LOGIN_REQUEST, login);
  yield takeLatest(actionTypes.SIGN_UP_REQUEST, signUp);
}
