import React from 'react';

import UserCard from './UserCard';

import { User } from '../types/types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  }
}));

interface Props {
  users: User[],
  cardsAmount?: number
}

const UserCards: React.FC<Props> = (props) => {
  
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
            <Typography className={classes.header} variant="h6" align="center" color="textPrimary" gutterBottom>
              {'No <developers/> yet'}
            </Typography>
          )
        }
      </Grid>
    </Container>
  )
}

export default UserCards;