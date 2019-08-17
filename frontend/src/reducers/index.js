import { combineReducers } from 'redux';
import { windows } from './windows';


const rootReducer = combineReducers({
  // state: (state = {}) => state,
  windows, // Like { [id]: { ...<Obj for each Terminal class example> } }
});

export default rootReducer;
