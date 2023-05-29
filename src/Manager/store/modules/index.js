import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

<<<<<<< HEAD
import addmembers, { addmembersSaga } from './addmember';
import reserve from './reserve';
import regular from './regular';
import noshow from './noshow';
import dateReducer from '../../../User/user_store/date';
import roomReducer from '../../../User/store/modules/room';
import userInfo from '../../../User/store/modules/userInfo';
import reservation from '../../../User/store/modules/reservation';
import auth, { authSaga } from '../../../User/store/modules/auth';
import { meetingRoomSaga } from '../../../User/store/modules/room';
import { userInfoSaga } from '../../../User/store/modules/userInfo';
import { reservationSaga } from '../../../User/store/modules/reservation';
=======
import auth, { authSaga } from '../../../User/store/modules/auth';
import board, { boardSaga } from '../../../User/store/modules/board';

import addmembers, { addmembersSaga } from './addmember';
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
  auth,
  dateReducer,
  roomReducer,
  reservation,
  userInfo,
  loading,
=======
>>>>>>> ff2dcd851225751d402a504dc0d630dca8efab61
});

export function* rootSaga() {
<<<<<<< HEAD
  yield all([authSaga(), meetingRoomSaga(), userInfoSaga(), reservationSaga(), addmembersSaga(), notifySaga(), roomSaga()]);

=======
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
>>>>>>> refs/remotes/origin/master
}

export default rootReducer;
