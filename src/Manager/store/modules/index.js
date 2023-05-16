import { combineReducers } from 'redux';
import addmembers from './addmember';
import reserve from './reserve';
import rooms from './rooms';
import regular from './regular';
import notify from './notify';
import noshow from './noshow';

import dateReducer from '../../../User/user_store/date';
import roomReducer from '../../../User/user_store/room';
const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
  regular,
  notify,
  noshow,
  dateReducer,
  roomReducer

});

export default rootReducer;
