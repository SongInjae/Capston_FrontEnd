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
import userInfo from '../../../User/store/modules/userInfo';
import reservation from '../../../User/store/modules/reservation';
import auth, { authSaga } from '../../../User/store/modules/auth';
import { roomSaga } from '../../../User/store/modules/room';
import { userInfoSaga } from '../../../User/store/modules/userInfo';
import { reservationSaga } from '../../../User/store/modules/reservation';
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
  reservation,
  userInfo,
  auth,
  loading,
});

export function* rootSaga() {
  yield all([authSaga(), roomSaga(), userInfoSaga(), reservationSaga()]);
}

export default rootReducer;
