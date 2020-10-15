import { GET_USERS, EDIT_USER, DELETE_USER } from './actionTypes';

export const getUsers = () => {
  return {
    type: GET_USERS
  }
}

export const editUser = (user) => {
  return {
    type: EDIT_USER,
    user
  }
}

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id
  }
}