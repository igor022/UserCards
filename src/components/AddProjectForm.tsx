import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { addProject } from '../actions/projectActions';

import { User, Project, ProjectWithDevs } from '../types/types';

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
  dialog: {
    width: '500px',
    padding: theme.spacing(5),
  },
  statusSelect: {
    marginTop: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%'
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

const statuses = [
  'None', 'Active', 'Pending', 'Done', 'Closed'
]

interface Props {
  project: ProjectWithDevs,
  users: User[],
  open: boolean,
  history: any,
  addProject: (project: Project) => any,
  handleClose: () => void,
}

const AddProjectForm: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [devNames, setDevNames] = useState<Array<string>>([]);
  const [status, setStatus] = useState('None');
  const [formFields, setFormFields] = useState({
    name: '',
    price: '',
    description: '',
  });

  const { users } = props;
  const stuffUsers = users.filter((user) => user.stuffId === localStorage.getItem('id'));

  const changeStatus = (e) => {
    setStatus(e.target.value);
  }

  const changeDevs = (e) => {
    setDevNames(e.target.value);
  };

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = localStorage.getItem('id');
    if (id) {
      props.addProject({ ...formFields, devs: devNames, status, stuffId: id });
    } else {
      props.history.push('/auth/signup');
      return;
    }
    props.handleClose();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add project</DialogTitle>
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
              required
              multiline
              rowsMax={4}
              fullWidth
              value={formFields.price}
              onChange={handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="devs-label">Developers</InputLabel>
              <Select
                labelId="devs-label"
                id="devs"
                multiple
                value={devNames}
                onChange={changeDevs}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div>
                    {
                      (selected as Array<string>).map((id: string) => {
                        const user = stuffUsers.find((u) => u._id === id); 
                        return user 
                        ? <Chip key={user._id} label={user.name} />
                        : null
                      })
                    }
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {stuffUsers.map((user) => (
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
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (project) => { dispatch(addProject(project)) }
  }
}


export default connect(undefined, mapDispatchToProps)(withRouter(AddProjectForm));