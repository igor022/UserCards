import React from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import ProjectsTable from './ProjectsTable';
import AddProjectForm from './AddProjectForm';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  usersContent: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: theme.spacing(2),
    minHeight: '100vh',
  },
}))

const Projects = (props) => {
  const classes = useStyles();

  return(
    <div className={classes.usersContent}>
      <AddProjectForm/>
      {
        props.isLoading 
        ? <h2>Loading...</h2>
        : <ProjectsTable />
      }
    </div>
  )
}

const mapStateToProps = (state) => ({ isLoading: state.isLoading });

export default connect(mapStateToProps)(Projects);