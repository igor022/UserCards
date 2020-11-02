import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../actions/userActions';


import Button from '@material-ui/core/Button';
import Cards from './UserCards';
import AddUserForm from './AddUserForm';
import Loading from './Loading';

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
  addButton: {
    margin: theme.spacing(2, 3, 0),
  }
}));


const Users = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const users = props.users;

  useEffect(() => {
    props.getUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.usersContent}>
      <Container className={classes.cardGrid} maxWidth="md">
        <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
          Add user
        </Button>
        <AddUserForm open={open} handleClose={handleClose}/>
        {
          props.isLoading 
          ? <Loading />
          : <Cards users={users} />
        }      
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.users.isLoading,
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);