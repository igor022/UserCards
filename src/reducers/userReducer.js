import { GET_USERS, EDIT_USER, DELETE_USER } from './actions/actionTypes';

const initState = {
  users: []
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS:
      {

      }
    case EDIT_USER:
      {

      }
    case DELETE_USER:
      {

      }
    default:
      break;
  }

  return state;
}

export default userReducer;