import axios from 'axios';

const deleteUser = async (id) => {
  try {
    const users = await axios (
      {
        method: 'delete',
        url: 'http://localhost:8080/users/',
        data: {
          id,
          jwt: localStorage.getItem('jwt'),
        }
      }
    );
    return users.data;
  } catch(err) {
    throw(err);
  }
}

const editUser = async (user) => {
  try {
    const users = await axios (
      {
        method: 'patch',
        url: 'http://localhost:8080/users/',
        data: {
          user,
          jwt: localStorage.getItem('jwt'),
        }
      }
    );
    return users.data;
  } catch(err) {
    throw(err);
  }
}

const getUsers = async () => {
  try {
    const { data } = await axios.get('http://localhost:8080/users/');
    return data; 
  } catch(err) {
    throw(err);
  }
}


export const userApi = {
  deleteUser,
  getUsers,
  editUser,
}