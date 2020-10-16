import React, { useState } from 'react';
import { connect } from 'react-redux';

import { editUser } from '../actions/userActions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addButton: {
    width: '100%'
  }
}));

const EditUserForm = (props) => {
  const [open, setOpen] = useState(false);

  const { user } = props;
  const [formFields, setFormFields] = useState({
    name: user.name,
    email: user.email,
    description: user.description
  });

  const classes = useStyles();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editUser({ ...user, ...formFields });
    handleClose();
  }


  return (
    <div>
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Edit user
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
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
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={formFields.email}
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
                value={formFields.description}
                onChange={handleChange}
              />
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
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (user) => { dispatch(editUser(user)) }
  }
}


export default connect(null, mapDispatchToProps)(withRouter(EditUserForm));