import {all, fork} from 'redux-saga/effects';
import placeSaga from './placeSaga';
import tourSaga from './tourSaga';
import userSaga from './userSaga';

export default function* watch() {
  yield all([fork(userSaga), fork(placeSaga), fork(tourSaga)]);
}
