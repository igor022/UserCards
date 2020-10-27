import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addUser } from '../actions/userActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(2, 3, 2),
  }
}));

const AddUserForm = (props) => {
  const [open, setOpen] = useState(false);

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    props.addUser(formFields);
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
        Add user
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add user</DialogTitle>
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
                  required
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  onChange={handleChange}
                />
                <TextField
                  id="description"
                  margin="dense"
                  label="About me"
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
    addUser: (user) => { dispatch(addUser(user)) }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddUserForm));