import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProjects } from '../actions/projectActions';
import { getUsers, editUser, deleteUser } from '../actions/userActions';

import { Project, User, FieldToEdit, GetProjects, GetUsers, EditUser, DeleteUser } from '../types/types';

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
import Tags from './Tags';

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
  addButton: {
    width: '100%'
  }
}));

interface Props {
  users: User[],
  projects: Project[],
  getProjects: GetProjects,
  getUsers: GetUsers,
  editUser: EditUser,
  deleteUser: DeleteUser,
  [propNames: string]: any
}

const UserProfile: React.FC<Props> = (props) => {
  const classes = useStyles();
  
  const [open, setOpen] = useState<boolean>(false);

  const {users, projects} = props;
  const userId = props.match.params.id;
  
  let user : User | undefined;
  if (users && users.length) {
    user = users.find((user) => user._id === userId);
    if (!user) {
      props.history.push('/404');
    }
  }

  let devProjects: Array<Project> = [];
  if (projects && user) {
    devProjects = projects.filter((project) => project.devs.find((dev) => dev === user!._id));
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
    const edited: User = {...user} as User;
    edited.tags.push(tag);
    props.editUser({ _id: edited._id as string, ...edited });
  }

  const deleteTag = (tag) => {
    const edited: User = {...user} as User;
    edited.tags = edited.tags.filter((t) => t !== tag);
    props.editUser({ _id: edited._id as string, ...edited });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                    image={user.imageUrl && user.imageUrl.length > 0 ? user.imageUrl : `https://robohash.org/${user._id}`}
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
            <Tags tags={user.tags} addTag={addTag} deleteTag={deleteTag}/>
            <hr></hr>
            <Typography variant="h6"  color="textPrimary">
              Projects:
            </Typography>
            <ul className={classes.projects}>
              {
                devProjects.map((project : Project) => (
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
            {
              user.stuffId === localStorage.getItem('id')
              ? (
                <>
                  <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
                    Edit user
                  </Button>
                  <EditUserForm open={open} user={user} handleClose={handleClose}/>
                  <Button className={classes.deleteButton} onClick={() => handleDelete(user!._id)} variant="contained" color="secondary">
                    Delete user
                  </Button>
                </>
              ) : null
            }
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
    editUser: (user: FieldToEdit) => { dispatch(editUser(user)) },
    deleteUser: (id: string) => { dispatch(deleteUser(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));