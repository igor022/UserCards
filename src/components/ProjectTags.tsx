import React, { useState } from 'react';
import { connect } from 'react-redux';

import { editProject } from '../actions/projectActions';
import { ProjectWithDevs, Project, User, EditProject, FieldToEdit } from '../types/types';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  formControl: {
    width: '100%'
  },
  navLink: {
    textDecoration: 'none',
    color: 'white'
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  projects: Project[],
  userId: string,
  editProject: EditProject
}

const ProjectTags: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { projects, userId } = props;

  const devProjects = projects
    .filter((project) => project.devs.find((dev) => dev === userId));
  
  const [devIds, setDevIds] = useState<string[]>(devProjects.map((dev) => dev._id) as string[]);
  const [open, setOpen] = useState<boolean>(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeDevs = (e) => {
    setDevIds(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    devProjects.forEach((project) => {
      props.editProject({ _id: project._id as string, devs: [...project.devs, userId] });
    })
    handleClose();
  }

  return (
    <Box component="ul" className={classes.root}>
      <li className={classes.chip}>
        <IconButton onClick={handleClickOpen} color="primary" size="small">
          <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <DialogContent>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Developers</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="devs"
                  multiple
                  value={devIds}
                  onChange={changeDevs}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <>
                      {
                        (selected as Array<string>).map((id: string) => {
                            const project = projects.find((p) => p._id === id); 
                            return project
                              ? <Chip key={project._id} label={project.name} />
                              : null
                          })
                      }
                    </>
                  )}
                  MenuProps={MenuProps}
                >
                  {projects.map((project) => (
                    <MenuItem key={project._id} value={project._id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Edit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </li>
      {devProjects.map((project, i) => {
        return (
          <li key={project._id}>
            <Link className={classes.navLink} to={`/projects/${project._id}`}>
              <Chip
                label={project.name}
                className={classes.chip}
              />
            </Link>
          </li>
        );
      })}
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProject: (project: FieldToEdit) => { dispatch(editProject(project)) }
  }
}

export default connect(undefined, mapDispatchToProps)(ProjectTags);