import axios from 'axios';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

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
    margin: theme.spacing(1, 0, 0, 0),
    
  },
  paper: {
    padding: theme.spacing(4),
  }
}));


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format'),
  password: Yup.string()
    .min(4, 'Should be at least 4 characters long')
});

const Login = (props) => {
  const classes = useStyles();

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      const { data } = await axios.post(
        'http://localhost:8080/auth/login/',
        {
          email,
          password
        }
      );

      if (data._id) {
        localStorage.setItem('id', data._id);
        localStorage.setItem('jwt', data.token);
        props.history.push('/');
      }

    } catch (err) {
      console.log('Err', err);
    }
  }

  const error = { color: 'red', fontSize: '0.75em' };

  return (
    <Box className={classes.root}>
      <Container className={classes.container} maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Log in
          </Typography>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div>email</div>
                <Field name="email" type="email"/>
                {errors.email && touched.email ? (
                  <div style={error}>{errors.email}</div>
                ) : null}
                <div>password</div>
                <Field name="password" type="password"/>
                {errors.password && touched.password ? (
                  <div style={error}>{errors.password}</div>
                ) : null}
                <div></div>
                <Button type="submit" className={classes.submit} variant="contained" color="primary">
                  Log in
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;