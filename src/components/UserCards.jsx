import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserCard from './UserCard';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));


const UserCards = (props) => {
  
  const { users } = props;
  const classes = useStyles();

  let stuffUsers;
  if (users) {
    stuffUsers = users.filter((user) => user.stuffId === localStorage.getItem('id'));
  }

  return(
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          stuffUsers && stuffUsers.length
          ? 
          stuffUsers
            .slice(0, props.cardsAmount)
            .map((user, i) => (
              <UserCard 
                key={user._id} 
                user={user} 
              >
              </UserCard>
            )
          )
          : (
            <p>No users</p>
          )
        }
      </Grid>
    </Container>
  )
}

export default UserCards;