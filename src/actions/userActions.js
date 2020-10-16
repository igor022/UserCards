import { GET_USERS_LOADING, GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from './actionTypes';
import api from '../api';

export const addUser = (user) => async (dispatch) => {
  try {
    const newUser = await api.addUser(user);

    dispatch({
      type: ADD_USER,
      payload: {
        user: newUser
      }
    });

  } catch (err) {
    throw(err);
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USERS_LOADING,
    })
    const users = await api.getUsers();
 
    dispatch({
      type: GET_USERS,
      payload: {
        users
      }
    });
  } catch (err) {
    throw(err);
  }
}

export const editUser = (user) => async(dispatch) => {
  try {
    const editedUser = await api.editUser(user);
    dispatch({
      type: EDIT_USER,
      payload: {
        user: editedUser
      }
    });
  } catch(err) {
    throw(err);
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    const user = await api.deleteUser(id);
    dispatch({
      type: DELETE_USER,
      payload: {
        id: user._id
      }
    });
  } catch(err) {
    throw(err);
  }
}