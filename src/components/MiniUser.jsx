import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
  },
}));

const MiniUser = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar>
        <Link className={classes.navLink} to={`/users/${props.id}`}>{props.name.split(' ').map((name) => name[0]).slice(0, 2)}</Link>
      </Avatar>
    </div>
  );
}

export default MiniUser;