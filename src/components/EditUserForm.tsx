import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import { editUser } from '../actions/userActions';

import { uploadFile } from '../api/s3';

import { User, EditUser, FieldToEdit } from '../types/types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';

import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  user: User,
  open: boolean,
  editUser: EditUser,
  handleClose: () => void,
}

const EditUserForm: React.FC<Props> = (props) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const { user } = props;
  const [formFields, setFormFields] = useState({
    name: user.name,
    email: user.email,
    description: user.description,
  });

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let file: File;
    const files: FileList = fileInput!.current!.files!;
    if (user._id) {
      if (files.length > 0) {
        file = files[0];
        const imageUrl: string = await uploadFile(file);
        
        if (imageUrl) {
          props.editUser({ _id: user._id, ...formFields, imageUrl });
        }  else {
          props.editUser({ _id: user._id, ...formFields });
        }
      } else {
        props.editUser({ _id: user._id, ...formFields });
      }
    }
    props.handleClose();
  }



  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <DialogContent>
          <InputLabel id="imageLabel">Update image</InputLabel>
          <input id="imageUrl" type="file" ref={fileInput} />
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
    editUser: (user: FieldToEdit) => { dispatch(editUser(user)) }
  }
}


export default connect(null, mapDispatchToProps)(withRouter(EditUserForm));