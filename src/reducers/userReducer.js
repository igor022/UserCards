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
        const { user } = payload;
        const users = [...state.users];
        users.unshift(user.data);
        return {
          ...state,
          users
        }
      }
      break;

    case EDIT_USER:
      {
        const { user } = payload;
        const users = [...state.users];
        const userToEdit = users.findIndex((u) => u._id === user._id);
        users.splice(userToEdit, 1, user);
        return {
          ...state,
          users
        }
      }
      break;

    case DELETE_USER: 
      {
        console.log(state.users);
        const { id } = payload;
        const users = state.users.filter((u) => u._id !== id);
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