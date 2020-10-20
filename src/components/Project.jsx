import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects, editProject, deleteProject } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import MiniUser from './MiniUser';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Loading from './Loading';
import EditProjectForm from './EditProjectForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    padding: theme.spacing(4),
  },
  projectTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '120%', // 16:9
  },
  userGrid: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: theme.palette.background.paper,
  },
  usersContent: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: theme.spacing(2),
    minHeight: '100vh',
  },
  deleteButton: {
    width: '100%',
  },
  aboutMe: {
    margin: theme.spacing(2, 0, 4, 0),
  },
  aboutText: {
    textAlign: 'justify',
    overflowWrap: 'break-word',
  },
  price: {
    color: 'green'
  },
  picture: {
    width: '100%',
  },
  devs: {
    display: 'flex',
  }
}));

const Project = (props) => {
  const classes = useStyles();

  const { projects, users } = props;

  const projectId = props.match.params.id;

  let project;
  let developers;
  if (projects && projects.length) {
    project = projects.find((p) => p._id === projectId);

    if (!project) {
      props.history.push('/404');
    }

    developers = project.devs.map((dev) => users.find((u) => u._id === dev))
      .filter((item) => item !== undefined);

    console.log('users', users);
    console.log('project', project);
    console.log('devs', developers)
  }



  useEffect(() => {
    props.getProjects();
    props.getUsers();
  }, []);

  const handleDelete = (id) => {
    props.deleteProject(id);
    props.history.push('/projects');
  }


  return (
    <div className={classes.usersContent}>
      {
        project && developers.length
          ?
          <Container maxWidth="md">
            <Paper>

              <Box className={classes.profile}>

                <Box className={classes.projectTitle}>
                  <Typography variant="h3" color="textPrimary" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="h5" color="textSecondary" paragraph>
                    {project.status}
                  </Typography>
                </Box>
                <Typography variant="h5" color="textPrimary" >
                  Price:
                </Typography>
                <Typography className={classes.price} variant="h5" paragraph>
                  {project.price}$
                </Typography>
                <Typography variant="h5" color="textPrimary">
                  Developers:
                </Typography>
                <Box className={classes.devs}>
                  {developers.map((dev, i) => (
                    <MiniUser key={dev._id} id={dev._id} name={dev.name} />
                  ))}
                </Box>

                <hr></hr>
                <div className={classes.aboutMe}>
                  <Typography variant="h4" color="textPrimary" gutterBottom>
                    About project
                </Typography>
                  <Typography className={classes.aboutText} variant="body1" color="textPrimary" gutterBottom>
                    {project.description}
                  </Typography>
                </div>

                <EditProjectForm project={project} />
                <Button className={classes.deleteButton} onClick={() => handleDelete(project._id)} variant="contained" color="secondary">
                  Delete project
                </Button>
              </Box>
            </Paper>
          </Container>

          : <Loading />
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    projects: state.projects.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    getProjects: () => { dispatch(getProjects()) },
    editProject: (project) => { dispatch(editProject(project)) },
    deleteProject: (id) => { dispatch(deleteProject(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Project));