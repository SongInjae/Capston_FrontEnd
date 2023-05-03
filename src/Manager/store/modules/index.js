import { combineReducers } from 'redux';
import addmembers from './addmember';

const rootReducer = combineReducers({
  addmembers,
});

export default rootReducer;
