import { combineReducers } from 'redux';
import addmembers from './addmember';
import reserve from './reserve';

const rootReducer = combineReducers({
  addmembers,
  reserve,
});

export default rootReducer;
