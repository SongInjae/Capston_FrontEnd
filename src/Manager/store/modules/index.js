import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

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
  dateReducer,
  roomReducer,
  reservation,
  userInfo,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), meetingRoomSaga(), userInfoSaga(), reservationSaga(), addmembersSaga(), notifySaga(), roomSaga()]);

}

export default rootReducer;
