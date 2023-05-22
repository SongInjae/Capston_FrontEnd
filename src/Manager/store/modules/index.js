import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import addmembers, { addmembersSaga } from './addmember';
import reserve from './reserve';
import regular from './regular';
import noshow from './noshow';

import auth, { authSaga } from '../../../User/store/modules/auth';
import rooms, { roomSaga } from './rooms';
import notify, { notifySaga } from './notify';
import loading from '../../../User/store/modules/loading';

const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
  regular,
  notify,
  noshow,
  auth,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), addmembersSaga(), notifySaga(), roomSaga()]);
}

export default rootReducer;
