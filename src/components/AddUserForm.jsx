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
    margin: theme.spacing(2, 3, 2),
  }
}));

const AddUserForm = (props) => {
  const [open, setOpen] = useState(false);

  const [form] = useState(createRef());
  const { addUser } = props;
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    const { name, email, description } = form.current;
    await addUser({
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
        Add user
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add user</DialogTitle>
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
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              required
            />
            <TextField
              id="description"
              margin="dense"
              label="About me"
              multiline
              rowsMax={4}
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

export default withRouter(AddUserForm);