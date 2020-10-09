import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import AddUserForm from './AddUserForm';
import { userApi } from '../api';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  usersContent: {
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));


function Users() {
  const classes = useStyles();
  
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const result = await userApi.getUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  }

  const addUser = async (data) => {
    const { name, email, description } = data;
   
    try {
      const user = await axios.post(
        'http://localhost:8080/users', 
        { 
          name,
          email, 
          description,
        },
      );
      getUsers();
      return user;

    } catch (err) {
      throw(err);
    }

  }

  const handleDelete = async (id) => {
    try {
      const users = await userApi.deleteUser(id);
      setUsers(users);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={classes.usersContent}>
      <Container className={classes.cardGrid} maxWidth="md">
        <AddUserForm addUser={addUser}/>
        <Cards users={users} handleDelete={handleDelete}/>
      </Container>
    </div>
  );
}

export default Users;