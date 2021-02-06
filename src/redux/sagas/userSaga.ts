import {put, call, takeLatest} from 'redux-saga/effects';
import * as userActions from '../actions/userActions';
import _ from 'lodash';
import actionTypes from 'redux/actionTypes';

function* login(payload:any) {
  
}


export default function* () {
  yield takeLatest(actionTypes.LOGIN_REQUEST, login);
}
