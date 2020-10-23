import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProjects } from '../actions/projectActions';
import { getUsers, editUser, deleteUser } from '../actions/userActions';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Loading from './Loading';
import EditUserForm from './EditUserForm';
import Tags from './Tags.jsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profile: {
    padding: theme.spacing(2, 3),
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
  projects: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: theme.spacing(0, 0, 1),
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  navLink: {
    textDecoration: 'none',
  },
}));

const User = (props) => {
  const classes = useStyles();
  
  const {users, projects} = props;
  const userId = props.match.params.id;
  
  let user;
  if (users && users.length) {
    user = users.find((user) => user._id === userId);
    if (!user) {
      props.history.push('/404');
    }
  }

  let devProjects = [];
  if (projects && user) {
    devProjects = projects.map((project) => {
      if(project.devs.find((dev) => dev === user._id)) {
        return project;
      }
    })
    .filter((item) => item !== undefined);
  }

  useEffect(() => {
    props.getProjects();
    props.getUsers();
  }, []);

  const handleDelete = (id) => {
    props.deleteUser(id);
    props.history.push('/users');
  }

  const addTag = (tag) => {
    const edited = {...user};
    edited.tags.push(tag);
    props.editUser(edited);
  }

  const deleteTag = (tag) => {
    const edited = {...user};
    const tags = user.tags.filter((t) => t !== tag)
    edited.tags = tags;
    props.editUser(edited);
  }

  return (
    <div className={classes.usersContent}>
    { 
      user
      ? 
        <Container maxWidth="sm">
          <Paper className={classes.profile}>
            <Grid container className={classes.userGrid} spacing={2}>
              <Grid item xs={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`https://cards-images.s3-eu-central-1.amazonaws.com/${user.imageUrl}.jpeg`}
                    title="Image title"
                  >
                    
                  </CardMedia>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5"  color="textPrimary" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {user.email}
                </Typography>   
                
              </Grid>
            </Grid>
            <Tags tags={user.tags} className={classes.tags} addTag={addTag} deleteTag={deleteTag}/>
            <hr></hr>
            <Typography variant="h6"  color="textPrimary">
              Projects:
            </Typography>
            <ul className={classes.projects}>
              {
                devProjects.map((project) => (
                  <li key={project._id}>
                    <Link className={classes.navLink} to={`/projects/${project._id}`}>
                      <Chip
                        label={project.name}
                        className={classes.chip}
                      />
                    </Link>
                  </li>
                ))
              } 
            </ul>          
            <hr></hr>
            <div className={classes.aboutMe}>
              <Typography variant="h4" color="textPrimary" gutterBottom>
                About me
              </Typography>
              <Typography className={classes.aboutText} variant="body1" color="textPrimary" gutterBottom>
                {user.description}
              </Typography>
            </div>

            <EditUserForm user={user}/>
            <Button className={classes.deleteButton} onClick={() => handleDelete(user._id)} variant="contained" color="secondary">
              Delete user
            </Button>
          </Paper>
        </Container> 
        
      : <Loading />
    }
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
    getProjects: () => {dispatch(getProjects())},
    getUsers: () => { dispatch(getUsers()) },
    editUser: (user) => { dispatch(editUser(user)) },
    deleteUser: (id) => { dispatch(deleteUser(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));