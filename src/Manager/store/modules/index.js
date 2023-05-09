import { combineReducers } from 'redux';
import addmembers from './addmember';
import reserve from './reserve';
import rooms from './rooms';

const rootReducer = combineReducers({
  addmembers,
  reserve,
  rooms,
});

export default rootReducer;
