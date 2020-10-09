import React from 'react';
import Cards from './Cards';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  usersContent: {
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));


function Users() {
  const classes = useStyles();

  return (
    <div className={classes.usersContent}>
      <Cards/>
    </div>
  );
}

export default Users;