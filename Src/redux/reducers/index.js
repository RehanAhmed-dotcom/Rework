import {combineReducers} from 'redux';
import userReducer from './userReducer';
import DestinationReducer from './DstinationReducer';
import appReducer from './appReducer';
export default combineReducers({
  USER: userReducer,
  DEST: DestinationReducer,
  APPSTATE: appReducer,
});
