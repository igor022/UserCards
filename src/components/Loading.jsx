import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.loading} variant="h6" align="center" color="textPrimary" gutterBottom>
      LOADING...
    </Typography>
  );
}

export default Loading;