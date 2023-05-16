import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import addmembers from './addmember';
import reserve from './reserve';
import rooms from './rooms';
import regular from './regular';
import notify from './notify';
import noshow from './noshow';

<<<<<<< HEAD
import dateReducer from '../../../User/user_store/date';
import roomReducer from '../../../User/user_store/room';
=======
import auth, { authSaga } from '../../../User/store/modules/auth';
import loading from '../../../User/store/modules/loading';

>>>>>>> refs/remotes/origin/master
const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
  regular,
  notify,
  noshow,
<<<<<<< HEAD
  dateReducer,
  roomReducer

=======
  auth,
  loading,
>>>>>>> refs/remotes/origin/master
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
