import { GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from '../actions/actionTypes';


const initState = {
  users: [],
}

const userReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case GET_USERS:
      {
        const users = payload.users;
        return {
          ...state,
          users
        }
      }
      break;

    case ADD_USER: 
      {

      }
      break;

    case EDIT_USER:
      {

      }
      break;

    case DELETE_USER: 
      {
        console.log(state.users);
        const { user } = payload;
        const users = state.users.filter((u) => u._id !== user._id);
        return {
          ...state,
          users
        }
      }
      break;

    default:
      break;
  }


  return state;
}

export default userReducer;