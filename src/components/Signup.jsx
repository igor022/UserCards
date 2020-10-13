import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {  
    textAlign: 'center',
    minHeight: '100vh',
    padding: theme.spacing(8, 0, 0, 0),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  container: {
    
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
    margin: theme.spacing(4, 0, 0, 0),
    
  },
  paper: {
    padding: theme.spacing(4),
  }
}));

const Signup = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.container} maxWidth="xs">
        <Paper className={classes.paper}>
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
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;