import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { editProject } from '../actions/projectActions';

import { User, Project, ProjectWithDevs, FieldToEdit } from '../types/types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  statusSelect: {
    marginTop: theme.spacing(2),
  }
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

const statuses = [
  'None', 'Active', 'Pending', 'Done', 'Closed'
]

interface Props {
  project: ProjectWithDevs,
  users: User[],
  open: boolean,
  editProject: (project: Project) => any,
  handleClose: () => void,
}

const EditProjectForm: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { project, users } = props;

  const [status, setStatus] = useState<string>(project.status)

  const [formFields, setFormFields] = useState({
    name: project.name,
    price: project.price,
    description: project.description,
  });

  const [devIds, setDevIds] = useState<string[]>(project.devs.map((dev) => dev._id) as string[]);

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }

  const changeDevs = (e) => {
    setDevIds(e.target.value);
  };

  const changeStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editProject({ ...project, ...formFields, devs: devIds, status });
    props.handleClose();
  }


  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={formFields.name}
            fullWidth
            required
            onChange={handleChange}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="statusLabel">Status</InputLabel>
            <Select 
              labelId="statusLabel"           
              id="status"
              value={status}
              onChange={changeStatus}
            >
              {
                statuses.map((status, i) => (
                  <MenuItem key={i} value={status}>{status}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <TextField
            id="price"
            margin="dense"
            label="Price"
            type="text"
            multiline
            rowsMax={4}
            fullWidth
            value={formFields.price}
            onChange={handleChange}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Developers</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="devs"
              multiple
              defaultValue={project.devs}
              value={devIds}
              onChange={changeDevs}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <>
                  {
                    (selected as Array<string>).map((id: string) => {
                        const user = users.find((u) => u._id === id); 
                        return user 
                        ? <Chip key={user._id} label={user.name} />
                        : null
                      })
                  }
                </>
              )}
              MenuProps={MenuProps}
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="description"
            margin="dense"
            label="About"
            type="text"
            multiline
            rowsMax={4}
            fullWidth
            value={formFields.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProject: (project: FieldToEdit) => { dispatch(editProject(project)) }
  }
}

export default connect(undefined, mapDispatchToProps)(withRouter(EditProjectForm));