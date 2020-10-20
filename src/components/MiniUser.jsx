import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  icon: {
    backgroundColor: deepOrange[500],
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  navLink: {
    textDecoration: 'none',
    color: 'white'
  },
}));

const MiniUser = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link alt={props.name} className={classes.navLink} to={`/users/${props.id}`}>
        <Avatar className={classes.icon} src={`https://robohash.org/${props.id}`}>
          {props.name.split(' ').map((name) => name[0]).slice(0, 2)}
        </Avatar>
      </Link>
    </div>
  );
}

export default MiniUser;