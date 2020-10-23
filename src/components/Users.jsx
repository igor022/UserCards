import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Cards from './UserCards';
import AddUserForm from './AddUserForm';
import { getUsers } from '../actions/userActions';
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


const Users = (props) => {
  const classes = useStyles();

  const users = props.users;

  useEffect(() => {
    props.getUsers();
  }, []);

  return (
    <div className={classes.usersContent}>
      <Container className={classes.cardGrid} maxWidth="md">
        <AddUserForm />
        <Cards users={users} />
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);