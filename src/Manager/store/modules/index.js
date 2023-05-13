import { combineReducers } from 'redux';
import addmembers from './addmember';
import reserve from './reserve';
import rooms from './rooms';
import regular from './regular';
import notify from './notify';
import noshow from './noshow';

const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
  regular,
  notify,
  noshow,
});

export default rootReducer;
