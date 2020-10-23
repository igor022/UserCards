import React, {useState} from 'react'
import { Link } from 'react-router-dom';

import MiniUser from './MiniUser';
import Status from './Status';
import EditProjectForm from './EditProjectForm';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rowName: {
    paddingLeft: theme.spacing(2)
  },
  price: {
    color: 'green'
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

const ProjectTableRow = (props) => {

  const classes = useStyles();
  const { project } = props;

  const [open, setOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(undefined);

  const handleOpen = (id) => {
    setProjectToEdit(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow
      key={project._id}
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
                <MiniUser key={dev._id} id={dev._id} name={dev.name} imageUrl={dev.imageUrl}/>
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
          <IconButton className={classes.action} onClick={() => handleOpen(project._id)}>            
            <EditIcon />
          </IconButton>
          <IconButton className={classes.action} onClick={() => props.deleteProject(project._id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <EditProjectForm handleClose={handleClose} open={open && projectToEdit === project._id} project={project} />
      </TableRow>
  );
}

export default ProjectTableRow;