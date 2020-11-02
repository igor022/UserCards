import { GET_USERS_LOADING, GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from '../actions/actionTypes';

import { User } from '../types/types';

interface UsersState {
  users: Array<User>,
  isLoading: boolean
}

const initState: UsersState = {
  users: [],
  isLoading: false,
}

const userReducer = (state: UsersState = initState, {type, payload}) => {
  switch (type) {
    case GET_USERS_LOADING:
      {
        return {
          ...state,
          isLoading: true
        }
      }
      break;

    case GET_USERS:
      {
        const users = payload.users;
        return {
          ...state,
          users,
          isLoading: false
        }
      }
      break;

    case ADD_USER: 
      {
        const { user } = payload;
        const users = [...state.users];
        users.unshift(user);
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