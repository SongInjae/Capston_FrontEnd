import { combineReducers } from 'redux';
import addmembers from './addmember';
import reserve from './reserve';
import rooms from './rooms';
import regular from './regular';

const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
  regular,
});

export default rootReducer;
