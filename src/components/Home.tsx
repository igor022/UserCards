import React, {useEffect, useMemo} from 'react';
import { connect } from 'react-redux';

import { getProjects } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import Loading from './Loading';

import { User, Project, UserWithProjects, GetProjects, GetUsers } from '../types/types';

import { getDevsWithProjects } from '../utils/utils';

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

interface Props {
  users: User[],
  projects: Project[],
  usersLoading: boolean,
  projectsLoading: boolean,
  getUsers: GetUsers,
  getProjects: GetProjects,
}

const Home: React.FC<Props> = (props) => {
  const classes = useStyles();

  const users = props.users;
  const projects = [...props.projects];
  
  
  const devsWithProjects: UserWithProjects[] = useMemo(() => getDevsWithProjects(projects, users), [projects, users]);

  
  // Sort top projects and users
  if (projects) {
    projects.sort((a, b) => (parseInt(b.price) - parseInt(a.price)));
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
          !props.usersLoading && devsWithProjects 
          ? <UserCards users={devsWithProjects} cardsAmount={3}/>
          : <Loading />
        }
        
      </div>

      <div className={classes.projectCards}>
        <Typography className={classes.title} variant="h4" color="textPrimary" gutterBottom>
          Top projects
        </Typography>
        {
          !props.projectsLoading && projects
          ? <ProjectCards projects={projects} cardsAmount={3}/>
          : <Loading />
        }    
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
    users: state.users.users,
    projectsLoading: state.projects.isLoading,
    usersLoading: state.users.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => { dispatch(getProjects())},
    getUsers: () => { dispatch(getUsers())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);