import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import addmembers from './addmember';
import reserve from './reserve';
import rooms from './rooms';
import regular from './regular';
import notify from './notify';
import noshow from './noshow';
import dateReducer from '../../../User/user_store/date';
import roomReducer from '../../../User/store/modules/room';
import auth, { authSaga } from '../../../User/store/modules/auth';
import { roomSaga } from '../../../User/store/modules/room';
import loading from '../../../User/store/modules/loading';

const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
  regular,
  notify,
  noshow,
  dateReducer,
  roomReducer,
  auth,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), roomSaga()]);
}

export default rootReducer;
