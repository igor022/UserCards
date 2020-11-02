import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjects, editProject, deleteProject } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import MiniUser from './MiniUser';
import Status from './Status';

import { Project, User, GetUsers, GetProjects, EditProject, DeleteProject, FieldToEdit } from '../types/types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
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
    flexWrap: 'wrap'
  },
  editButton: {
    width: '100%'
  },
}));

interface Props { 
  projects: Project[],
  users: User[],
  getUsers: GetUsers,
  getProjects: GetProjects,
  editProject: EditProject,
  deleteProject: DeleteProject,
  [propNames: string]: any,
}

const ProjectProfile: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { projects, users } = props;

  const projectId = props.match.params.id;

  
  let stuffUsers;
  if (users) {
    stuffUsers = users.filter((user) => user.stuffId === localStorage.getItem('id'));
  }
  
  let project;
  let developers;
  if (projects && projects.length && stuffUsers) {
    project = projects.find((p) => p._id === projectId);

    if (!project) {
      props.history.push('/404');
    }

    developers = project.devs.map((dev) => stuffUsers.find((u) => u._id === dev))
      .filter((item) => item !== undefined);
  }
  

  const [open, setOpen] = useState(false);

  const changeOpen = (open) => {
    setOpen(open);
  }

  const handleClose = () => {
    setOpen(false);
  };


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
        project && developers
          ?
          <Container maxWidth="md">
            <Paper>
              <Box className={classes.profile}>
                <Box className={classes.projectTitle}>
                  <Typography variant="h3" color="textPrimary" gutterBottom>
                    Project: {project.name}
                  </Typography>
                  <Typography variant="h5" color="textSecondary" paragraph>
                    <Status name={project.status} />
                  </Typography>
                </Box>
                <Typography variant="h6" color="textPrimary" >
                  Price:
                </Typography>
                <Typography className={classes.price} variant="h5" paragraph>
                  ${project.price}
                </Typography>
                <hr></hr>
                <Typography variant="h6" color="textPrimary">
                  {developers.length} developers:
                </Typography>
                <Box className={classes.devs}>
                  {developers.map((dev) => (
                    <MiniUser key={dev._id} id={dev._id} name={dev.name} imageUrl={dev.imageUrl}/>
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

                <Button className={classes.editButton} variant="contained" color="primary" onClick={() => changeOpen(true)}>
                  Edit project
                </Button>
                <EditProjectForm handleClose={handleClose} open={open} project={{...project, devs: developers}} users={stuffUsers}/>
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
    editProject: (project: FieldToEdit) => { dispatch(editProject(project)) },
    deleteProject: (id: string) => { dispatch(deleteProject(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectProfile));