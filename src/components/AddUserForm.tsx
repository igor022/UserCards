import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { uploadFile } from '../api/s3';
import { addUser } from '../actions/userActions';

import { User, AddUser } from '../types/types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


interface Props {
  open: boolean,
  history: any,
  addUser: AddUser,
  handleClose: () => void,
}

const AddUserForm: React.FC<Props> = (props) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    description: '',
    imageUrl: '',
    tags: []
  });

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stuffId: string | null = localStorage.getItem('id');
    if (stuffId) {
      let file: File;
      const files: FileList = fileInput!.current!.files!;
      if (files.length > 0) {
        file = files[0];
        const imageUrl: string = await uploadFile(file);
      
        if (imageUrl) {
          props.addUser({ ...formFields, imageUrl, stuffId });
        }  else {
          props.addUser({ ...formFields, stuffId });
        }
      
      } else {
        props.addUser({ ...formFields, stuffId });
      }
    } else {
      props.history.push('/auth/signup');
      return;
    }

    props.handleClose();
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add user</DialogTitle>
        <form
          onSubmit={handleSubmit} 
          autoComplete="off"
        > 
          <DialogContent>    
            <InputLabel id="imageLabel">Add image</InputLabel>
            <input id="imageUrl" type="file" ref={fileInput} />
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
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user: User) => { dispatch(addUser(user)) }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AddUserForm));