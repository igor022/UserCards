import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { getProjects } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import { Project, User, ProjectWithDevs } from '../types/types';

import Loading from './Loading';

import ProjectsTable from './ProjectsTable';
import AddProjectForm from './AddProjectForm';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(2, 0, 2),
  },
  usersContent: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: theme.spacing(2),
    minHeight: '100vh',
  },
}))

interface Props {
  users: User[],
  projects: Project[],
  isLoading: boolean,
  getUsers: () => User[],
  getProjects: () => Project[]
}

const Projects = (props: Props) => {
  const classes = useStyles();
  const id = localStorage.getItem('id')!;

  const [open, setOpen] = useState<boolean>(false);

  const { users, projects } = props;

  //const [projectsWithDevs, setProjectsWithDevs] = useState<ProjectWithDevs[]>([]);
  //let projectsWithDevs: ProjectWithDevs[] = [];
  const projectsWithDevs: ProjectWithDevs[] = useMemo(() => getProjectsWithDevs(projects, users, id), [projects, users, id]);
  const stuffUsers: User[] = useMemo(() => getStuffUsers(users, id), [users, id]);
  //const [stuffUsers, setStuffUsers] = useState<User[]>([]);
  
  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  }
  
  useEffect(() => {
    props.getUsers();
    props.getProjects();
  }, [])
  
  function getStuffUsers(users: User[], id: string) {
    console.log('getStuffUsers');
    if (id && users) {
      return users.filter((user) => user.stuffId === id);
    }
    return [];
  }

  function getProjectsWithDevs(projects : Project[], users: User[], id: string): ProjectWithDevs[] {
    console.log('getProjectsWithDevs');
    if (projects && users && id) {
      const stuff = users.filter((user) => user.stuffId === id);

      const withDevs = projects
        .filter((p) => p.stuffId === id)
        .map((project) => {
          const developers: User[] = project.devs.map((dev) => stuff.find((u) => u._id === dev))
            .filter((item) => item !== undefined) as User[];
      
          return {
            ...project,
            devs: developers
          } 
        }
      );
      return withDevs;
    }
    return [];
  }
  // useEffect(() => {
  //   console.log('UPDATE');
  //   const id = localStorage.getItem('id');
  //   if (projects && users && id) {
  //     const stuff = users.filter((user) => user.stuffId === id);
  //     setStuffUsers(stuff);

  //     const withDevs = projects
  //       .filter((p) => p.stuffId === id)
  //       .map((project) => {
  //         const developers: User[] = project.devs.map((dev) => stuffUsers.find((u) => u._id === dev))
  //           .filter((item) => item !== undefined) as User[];
      
  //         return {
  //           ...project,
  //           devs: developers
  //         } 
  //       }
  //     );
  //     setProjectsWithDevs(withDevs);
  //   }
  // }, [projects, users])

  return(
    <div className={classes.usersContent}>
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleOpen}>
        Add project
      </Button>
      <AddProjectForm open={open} users={users} handleClose={handleClose}/>
      {
        props.isLoading 
        ? <Loading />
        : <ProjectsTable projectsWithDevs={projectsWithDevs} stuffUsers={stuffUsers}/>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    isLoading: state.projects.isLoading,
    projects: state.projects.projects,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    getProjects: () => { dispatch(getProjects()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);