import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import auth, { authSaga } from '../../../User/store/modules/auth';
import addmembers, { addmembersSaga } from './addmember';
import rooms, { roomSaga } from './rooms';
import notify, { notifySaga } from './notify';
import reserve, { reserveSaga } from './reserve';
import regular, { regularSaga } from './regular';
import noshow, { noshowSaga } from './noshow';
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
    regularSaga(),
    noshowSaga(),
  ]);
}

export default rootReducer;
