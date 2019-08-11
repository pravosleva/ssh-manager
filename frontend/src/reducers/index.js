import { combineReducers } from 'redux';
import { connections } from './connections';


const rootReducer = combineReducers({
  // state: (state = {}) => state,
  connections,
});

export default rootReducer;
