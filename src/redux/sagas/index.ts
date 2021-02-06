import {all, fork} from 'redux-saga/effects';
import userSaga from './userSaga';

export default function* watch() {
  yield all([
    fork(userSaga),
  ]);
}
