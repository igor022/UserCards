import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addProject } from '../actions/projectActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(0, 0, 2),
  }
}));

const AddProjectForm = (props) => {
  const [open, setOpen] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    status: '',
    price: '',
    devs: [],  
    description: ''
  });

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addProject(formFields);
    handleClose();
  }

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Add project
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new project</DialogTitle>
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
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="status"
                  label="Status"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  id="price"
                  margin="dense"
                  label="Price"
                  multiline
                  rowsMax={4}
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  id="devs"
                  margin="dense"
                  label="Devs"
                  multiline
                  rowsMax={4}
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  id="description"
                  margin="dense"
                  label="About project"
                  multiline
                  rowsMax={4}
                  fullWidth
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
    users: state.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProject: (project) => { dispatch(addProject(project)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProjectForm));