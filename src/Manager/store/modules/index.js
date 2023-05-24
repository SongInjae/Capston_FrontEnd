import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import addmembers, { addmembersSaga } from './addmember';
import regular from './regular';
import noshow from './noshow';

import auth, { authSaga } from '../../../User/store/modules/auth';
import rooms, { roomSaga } from './rooms';
import notify, { notifySaga } from './notify';
import reserve, { reserveSaga } from './reserve';
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
  yield all([
    authSaga(),
    addmembersSaga(),
    notifySaga(),
    roomSaga(),
    reserveSaga(),
  ]);
}

export default rootReducer;
