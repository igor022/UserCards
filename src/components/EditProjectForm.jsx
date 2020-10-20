import React, { useState } from 'react';
import { connect } from 'react-redux';

import { editProject } from '../actions/projectActions';

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
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editButton: {
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EditProjectForm = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const { project } = props;
  const [formFields, setFormFields] = useState({
    name: project.name,
    status: project.status,
    price: project.price,
    devs: project.devs,
    description: project.description
  });


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
    props.editProject({ ...project, ...formFields });
    handleClose();
  }


  const [personName, setPersonName] = React.useState([]);

  const changePerson = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <Button className={classes.editButton} variant="contained" color="primary" onClick={handleClickOpen}>
        Edit project
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit project</DialogTitle>
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
              value={formFields.description}
              onChange={handleChange}
            />

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={personName}
                onChange={changePerson}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {project.devs.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
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
    editProject: (project) => { dispatch(editProject(project)) }
  }
}


export default connect(null, mapDispatchToProps)(withRouter(EditProjectForm));