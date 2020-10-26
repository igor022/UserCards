import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
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

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too short')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Should be at least 4 characters long')
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords dont match')
    .required('Required'),
})

const Signup = (props) => {
  const classes = useStyles();

  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const error = { color: 'red', fontSize: '0.75em' };

  const handleSubmit = async (values) => {
    const { name, email, password, repeatPassword } = values;

    if (password === repeatPassword) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/auth/signup/`,
        {
          name,
          email,
          password
        }
      );
  
      if (data._id) {
        localStorage.setItem('id', data._id);
        localStorage.setItem('jwt', data.token);
        props.history.push('/');
      }
    }
  }

  return (
    <Box className={classes.root}>
      <Container className={classes.container} maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Sign up
          </Typography>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div>name</div>
                <Field name="name"/>
                {errors.name && touched.name ? (
                  <div style={error}>{errors.name}</div>
                ) : null}
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
                <div>repeat password</div>
                <Field name="repeatPassword" type="password"/>
                {errors.repeatPassword && touched.repeatPassword ? (
                  <div style={error}>{errors.repeatPassword}</div>
                ) : null}
                <div></div>
                <Button type="submit" className={classes.submit} variant="contained" color="primary">
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
}

export default withRouter(Signup);