import { GET_USERS, ADD_USER, DELETE_USER, EDIT_USER } from './actionTypes';
import { userApi } from '../api';

export const addUser = (user) => async (dispatch) => {
  try {
    const user = await userApi.addUser(user);

    dispatch({
      type: ADD_USER,
      payload: {
        user
      }
    });

  } catch (err) {
    throw(err);
  }
}

export const getUsers = () => async (dispatch) => {
  try {
    const users = await userApi.getUsers();
 
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
    await userApi.editUser(user);
    const users = await userApi.getUsers();
    dispatch({
      type: GET_USERS,
      payload: {
        users
      }
    });
  } catch(err) {
    throw(err);
  }
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    const user = await userApi.deleteUser(id);
    dispatch({
      type: DELETE_USER,
      payload: {
        user
      }
    });
  } catch(err) {
    throw(err);
  }
}