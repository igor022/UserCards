import React, {useEffect, useState} from 'react';

import Header from './Header';
import Cards from './Cards';
import { userApi } from '../api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  homeCards: {
    minHeight: '50vh',
  }
}));

const Home = () => {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  const getUsers = async () => {
    try {
      const result = await userApi.getUsers();
      setUsers(result);
    } catch (error) {
      console.log(error);
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
    <div>
      <Header />
      <div className={classes.homeCards}>
        <Cards users={users} cardsAmount={3} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default Home;