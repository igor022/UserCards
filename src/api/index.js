import axios from 'axios';

const deleteUser = async (id) => {
  try {
    const users = await axios (
      {
        method: 'delete',
        url: 'http://localhost:8080/users/',
        data: {
          id  
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
  getUsers
}