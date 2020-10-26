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

  let devsWithProjects;
  if (projects && users) {
    devsWithProjects = users.map((u) => {
      const devProjects = projects.filter((p) => {
        return p.devs.find((dev) => dev === u._id);
      })
      return {
        ...u,
        devProjects
      };
    })
  }
  
  devsWithProjects.sort((a, b) => {
    const priceA = a.devProjects.reduce((prev, cur) => (prev + parseInt(cur.price)), 0);
    const priceB = b.devProjects.reduce((prev, cur) => (prev + parseInt(cur.price)), 0);
    return priceB - priceA;
  })

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
          devsWithProjects 
          ? <UserCards users={devsWithProjects} cardsAmount={3}/>
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