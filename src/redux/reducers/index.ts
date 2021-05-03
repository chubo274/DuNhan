import {combineReducers} from 'redux';
// Redux: Root Reducer
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import placeReducer from './placeReducer';
import tourReducer from './tourReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  loadingReducer,
  userReducer,
  placeReducer,
  tourReducer,
  bookingReducer,
});
// Exports
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
