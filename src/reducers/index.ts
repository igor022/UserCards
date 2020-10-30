import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  users: userReducer,
  projects: projectReducer
})

export default allReducers;