import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { editProject } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';

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
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editButton: {
    width: '100%'
  },
  formControl: {
    width: '100%'
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


const EditProjectForm = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const { users, project } = props;
  const [formFields, setFormFields] = useState({
    name: project.name,
    status: project.status,
    price: project.price,
    description: project.description,
  });

  const selectedDevs = users.map((user) => {
    const developer = (project.devs.find((dev) => dev._id === user._id));
    if (developer) {
      return user;
    }
  }).filter((dev) => dev !== undefined);

  console.log('selectedDevs', selectedDevs);
  const [personName, setPersonName] = useState(selectedDevs);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }

  const changeDevs = (event) => {
    console.log(personName)
    setPersonName(event.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const devs = personName.map((person) => person._id);
    props.editProject({ ...formFields, devs });
    handleClose();
  }


  useEffect(() => {
    props.getUsers();
  }, []);

  return (
    <div>
      <Button className={classes.editButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Edit project
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add project</DialogTitle>
        <form
          onSubmit={handleSubmit}
          className={classes.addForm}
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
            <TextField
              margin="dense"
              id="status"
              label="Status"
              type="text"
              value={formFields.email}
              fullWidth
              required
              onChange={handleChange}
            />
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
                labelId="devs"
                id="devs"
                multiple
                value={personName}
                onChange={changeDevs}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {console.log('Selected', selected)}
                    {selected.map((user) => (
                      <Chip key={user._id} label={user.name} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {props.users.map((user) => (
                  <MenuItem key={user._id} value={user}>
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
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    editProject: (project) => { dispatch(editProject(project)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProjectForm));