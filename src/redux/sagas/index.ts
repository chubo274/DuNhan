import {all, fork} from 'redux-saga/effects';
import provinceSaga from './provinceSaga';
import userSaga from './userSaga';

export default function* watch() {
  yield all([fork(userSaga), fork(provinceSaga)]);
}
