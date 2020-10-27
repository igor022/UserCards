import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { addProject } from '../actions/projectActions';
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
  addButton: {
    margin: theme.spacing(2, 0, 2),
  },
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

const AddProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too short!')
    .required('Required'),
  price: Yup.string()
    .required('Required'),
  description: Yup.string()
    
});

const AddProjectForm = (props) => {
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);
  const [devNames, setDevNames] = useState([]);
  const [status, setStatus] = useState('None');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeStatus = (e) => {
    setStatus(e.target.value);
  }

  const changeDevs = (e) => {
    setDevNames(e.target.value);
  };


  const handleSubmit = (values) => {
    const devs = devNames.map((person) => person._id);
    props.addProject({ ...values, devs, status });
    handleClose();
  }


  useEffect(() => {
    props.getUsers();
  }, []);

  return (
    <div>
      <Button className={classes.addButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Add project
      </Button>
      <Dialog className={classes.dialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add project</DialogTitle>
        <Formik
          initialValues={{
            name: '',
            price: '',
            description: '',
          }}
          validationSchema={AddProjectSchema}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <InputLabel id="name-label">Name</InputLabel>
              <Field name="name" />
              {errors.name && touched.name ? (
                <div>{errors.name}</div>
              ) : null}
              <InputLabel id="price-label">Price</InputLabel>
              <Field name="price" />
              {errors.price && touched.price ? (
                <div>{errors.price}</div>
              ) : null}
              <InputLabel id="status-label">Status</InputLabel>
              <Select     
                id="status"
                value={status}
                onChange={changeStatus}
              >
                {
                  statuses.map((status) => (
                    <MenuItem value={status}>{status}</MenuItem>
                  ))
                }
              </Select>
              <InputLabel id="demo-mutiple-chip-label">Developers</InputLabel>
              <Select
                labelId="devs"
                id="devs"
                multiple
                value={devNames}
                onChange={changeDevs}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
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
              <InputLabel id="description-label">Description</InputLabel>
              <Field name="description" />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Add
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers()) },
    addProject: (project) => { dispatch(addProject(project)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProjectForm));