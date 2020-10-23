import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import { getProjects } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import Header from './Header';
import UserCards from './UserCards';
import ProjectCards from './ProjectCards';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  userCards: {
    minHeight: '50vh',
  },
  projectCards: {
    minHeight: '50vh',
    backgroundColor: 'rgb(250, 250, 250)'
  },
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(4)
  }
}));

const Home = (props) => {
  const classes = useStyles();

  const { users, projects } = props;

  if (projects) {
    projects.sort((a, b) => (b.price - a.price));
  }


  useEffect(() => {
    props.getProjects();
    props.getUsers();
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.userCards}>
        <Typography className={classes.title} variant="h4"  color="textPrimary" gutterBottom>
          Top developers
        </Typography>
        { 
          users 
          ? <UserCards users={users} cardsAmount={3}/>
          : ''
        }
        
      </div>

      <div className={classes.projectCards}>
        <Typography className={classes.title} variant="h4" color="textPrimary" gutterBottom>
          Top projects
        </Typography>
        {
          projects
          ? <ProjectCards projects={projects} cardsAmount={3}/>
          : ''
        }    
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => { dispatch(getProjects())},
    getUsers: () => { dispatch(getUsers())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);