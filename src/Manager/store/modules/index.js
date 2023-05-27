import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import auth, { authSaga } from '../../../User/store/modules/auth';
import board, { boardSaga } from '../../../User/store/modules/board';

import addmembers, { addmembersSaga } from './addmember';
import rooms, { roomSaga } from './rooms';
import notify, { notifySaga } from './notify';
import reserve, { reserveSaga } from './reserve';
import regular, { regularSaga } from './regular';
import noshow, { noshowSaga } from './noshow';
import loading from '../../../User/store/modules/loading';

const rootReducer = combineReducers({
  auth,
  board,
  loading,
  addmembers,
  reserve,
  rooms,
  regular,
  notify,
  noshow,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    boardSaga(),
    addmembersSaga(),
    notifySaga(),
    roomSaga(),
    reserveSaga(),
    regularSaga(),
    noshowSaga(),
  ]);
}

export default rootReducer;
