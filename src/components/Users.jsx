import React from 'react';
import Cards from './Cards';
import AddUserForm from './AddUserForm';
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

  return (
    <div className={classes.usersContent}>
      <Container className={classes.cardGrid} maxWidth="md">
        <AddUserForm />
        <Cards/>
      </Container>
    </div>
  );
}

export default Users;