import {combineReducers} from 'redux';
// Redux: Root Reducer
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';
import provinceReducer from './provinceReducer';

const rootReducer = combineReducers({
  loadingReducer,
  userReducer,
  provinceReducer,
});
// Exports
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
