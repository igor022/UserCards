import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 'auto', 2, 'auto'),
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  submit: {
    margin: theme.spacing(4),
  }
}));

const Signup = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Sign up
      </Typography>
      <form className={classes.form} autoComplete="off">
        <TextField type="text" id="name" label="Name" fullWidth/>
        <TextField type="email" id="email" label="Email" fullWidth/>
        <TextField type="password" id="password" label="Password" fullWidth/>
        <TextField type="password" id="repeatPassword" label="Repeat password" fullWidth/>
        <Button className={classes.submit} variant="contained" color="primary">
          Sign up
        </Button>
      </form>
    </Container>
  );
}

export default Signup;