import React, { useState } from 'react';


import { User, ProjectWithDevs } from '../types/types';

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

interface Props {
  projectsWithDevs: ProjectWithDevs[],
  stuffUsers: User[],

}

const ProjectsTable: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { projectsWithDevs, stuffUsers } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage);

  return (
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
                    <ProjectTableRow project={project} key={project._id} users={stuffUsers}/>
                  )
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projectsWithDevs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div >
  );
}



export default ProjectsTable;