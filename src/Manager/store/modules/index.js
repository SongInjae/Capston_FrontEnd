import { combineReducers } from 'redux';
import addmembers from './addmember';
import reserve from './reserve';
import dateReducer from '../../../User/user_store/date';
import roomReducer from '../../../User/user_store/room';
const rootReducer = combineReducers({
  addmembers,
  reserve,
  dateReducer,
  roomReducer
});

export default rootReducer;
