import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProjects, deleteProject } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

import MiniUser from './MiniUser';
import Status from './Status';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


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
  console.log('Users', users);
  console.log('Projects', projects);
  console.log('With devs', projectsWithDevs);


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
                        <TableRow
                          key={project.name}
                          className={classes.tableRow}
                        >
                          <TableCell className={classes.rowName} component="th" id={project._id} scope="project" padding="none">
                            <Link className={classes.navLink} to={`/projects/${project._id}`}>
                              {project.name}
                            </Link>
                          </TableCell>
                          <TableCell align="left"><Status name={project.status} /></TableCell>
                          <TableCell className={classes.price} align="left"><b>${project.price}</b></TableCell>
                          <TableCell align="left">
                            <Box className={classes.devs}>
                              {
                                project.devs.slice(0, 5).map((dev) => (
                                  <MiniUser key={dev._id} id={dev._id} name={dev.name} />
                                ))
                              }
                              {
                                project.devs.length > 5
                                  ? <b>{`+ ${project.devs.length - 5} more`}</b>
                                  : ''
                              }
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton className={classes.action} >
                              <EditIcon />
                            </IconButton>
                            <IconButton className={classes.action} onClick={() => props.deleteProject(project._id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
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