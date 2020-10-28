import axios from 'axios';

const api = process.env.REACT_APP_API;

const addUser = async (user) => {
  try {
    const { data } = await axios.post(
      `${api}/users`, 
      { 
        user,
        jwt: localStorage.getItem('jwt'),
      },
    );

    return data;
  } catch (err) {
    throw(err);
  }

}

const deleteUser = async (id) => {
  try {
    const { data } = await axios (
      {
        method: 'delete',
        url: `${api}/users/`,
        data: {
          id,
          jwt: localStorage.getItem('jwt'),
        }
      }
    );
    return data;
  } catch(err) {
    throw(err);
  }
}

const editUser = async (user) => {
  try {
    const { data } = await axios (
      {
        method: 'patch',
        url: `${api}/users/`,
        data: {
          user,
          jwt: localStorage.getItem('jwt'),
        }
      }
    );
    return data;
  } catch(err) {
    throw(err);
  }
}

const getUsers = async () => {
  try {
    const { data } = await axios.get(`${api}/users/`);
    return data; 
  } catch(err) {
    throw(err);
  }
}


export default {
  addUser,
  deleteUser,
  getUsers,
  editUser,
}