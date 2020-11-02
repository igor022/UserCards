import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tags = (props) => {
  const classes = useStyles();

  const { tags, addTag, deleteTag } = props;
  const [tag, setTag] = useState('');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTag(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTag(tag);
    handleClose();
  }

  return (
    <Box component="ul" className={classes.root}>
      <li className={classes.chip}>
        <IconButton onClick={handleClickOpen} color="primary" size="small">
          <AddIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="tag"
                label="Tag"
                type="text"
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
      </li>
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <Chip
              label={tag}
              onDelete={() => deleteTag(tag)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Box>
  );
}

export default Tags;