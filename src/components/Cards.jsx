import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardItem from './CardItem';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));


export default function Cards(props) {
  const [users, setUsers] = useState([]);
  
  const classes = useStyles();
   
  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/users/');
      setUsers(data); 
    } catch(err) {
      throw(err);
    }
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return(
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          users.length 
          ? 
          users
            .slice(0, props.cardsAmount)
            .map((user, i) => (
              <CardItem 
                key={user._id} 
                user={user} 
              >
              </CardItem>
            )
          )
          : ''
        }
      </Grid>
    </Container>
  )
}