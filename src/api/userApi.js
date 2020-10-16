import axios from 'axios';

const addUser = async (user) => {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/users', 
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
        url: 'http://localhost:8080/users/',
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
        url: 'http://localhost:8080/users/',
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
    const { data } = await axios.get('http://localhost:8080/users/');
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