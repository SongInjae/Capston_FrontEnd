import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import addmembers, { addmembersSaga } from './addmember';
import dateReducer from '../../../User/user_store/date';
import roomReducer from '../../../User/store/modules/room';
import userInfo from '../../../User/store/modules/userInfo';
import reservation from '../../../User/store/modules/reservation';
import { meetingRoomSaga } from '../../../User/store/modules/room';
import { userInfoSaga } from '../../../User/store/modules/userInfo';
import { reservationSaga } from '../../../User/store/modules/reservation';
import auth, { authSaga } from '../../../User/store/modules/auth';
<<<<<<< Updated upstream
import board, { boardSaga } from '../../../User/store/modules/board';

import addmembers, { addmembersSaga } from './addmember';
>>>>>>> refs/remotes/origin/master
=======
>>>>>>> Stashed changes
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
  dateReducer,
  roomReducer,
  reservation,
  userInfo,
});

export function* rootSaga() {

  yield all([

    authSaga(),
    boardSaga(),
    meetingRoomSaga(),
    addmembersSaga(),
    notifySaga(),
    roomSaga(),
    userInfoSaga(), reservationSaga(),
    reserveSaga(),
    regularSaga(),
    noshowSaga(),
  ]);
}

export default rootReducer;
