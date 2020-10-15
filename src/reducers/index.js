import userReducer from "./userReducer";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  users: userReducer
})

export default allReducers;