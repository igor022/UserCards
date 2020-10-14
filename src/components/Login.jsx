import axios from 'axios';
import React, { useState } from 'react';
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

const Login = (props) => {
  const classes = useStyles();

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formFields;
    const { data } = await axios.post(
      'http://localhost:8080/auth/login/',
      {
        email,
        password
      }
    );

    if (data._id) {
      console.log(data._id);
      props.history.push('/');
    }
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.container} maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Log in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
            <TextField onChange={handleChange} type="email" id="email" label="Email" fullWidth/>
            <TextField onChange={handleChange} type="password" id="password" label="Password" fullWidth/>
            <Button type="submit" className={classes.submit} variant="contained" color="primary">
              Log in
            </Button>
          </form>
          </Paper>
      </Container>
    </Box>
  );
}

export default Login;