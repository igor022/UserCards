import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../actions/userActions';

import Header from './Header';
import Cards from './Cards';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  homeCards: {
    minHeight: '50vh',
  }
}));

const Home = (props) => {
  const classes = useStyles();

  const users = props.users;

  useEffect(() => {
    props.getUsers();
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.homeCards}>
        <Cards users={users} cardsAmount={3}/>
      </div>
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
    getUsers: () => { dispatch(getUsers())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);