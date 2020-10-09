import React, { useState, createRef } from 'react';
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

  const [form] = useState(createRef());
  const { editUser, user } = props;
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    const { name, email, description } = form.current;
    await editUser({
      name: name.value,
      email: email.value,
      description: description.value,
    })
    handleClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  }


  return (
    <div>
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Edit user
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
        <DialogContent>
          <form 
            onSubmit={handleSubmit} 
            className={classes.addForm} 
            autoComplete="off"
            ref={form}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={user.name}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={user.email}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="About"
              type="text"
              value={user.description}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(EditUserForm);