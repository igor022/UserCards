import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getProjects, deleteProject } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import ProjectTableRow from './ProjectTableRow';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,

  },
  tableBody: {

  },
  rowName: {
    paddingLeft: theme.spacing(2)
  },
  price: {
    color: 'green'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  devs: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  action: {

  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const ProjectsTable = (props) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { projects, users } = props;


  const projectsWithDevs = projects.map((project) => {
    const developers = project.devs.map((dev) => users.find((u) => u._id === dev))
      .filter((item) => item !== undefined);

    return {
      ...project,
      devs: developers
    }

  });
  // console.log('Users', users);
  // console.log('Projects', projects);
  // console.log('With devs', projectsWithDevs);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    props.getProjects();
  }, [])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage);

  return (
    
    projectsWithDevs
    ? (
      <div className={classes.root} >
          <Paper className={classes.paper}>        
            <TableContainer >
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size='medium'
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Developers</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                  {projectsWithDevs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((project) => {
                      return (         
                        <ProjectTableRow project={project} />
                      )
                    }
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={projects.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div >
      )
      : ''
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    projects: state.projects.projects,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    getProjects: () => { dispatch(getProjects()) },
    deleteProject: (id) => { dispatch(deleteProject(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable);