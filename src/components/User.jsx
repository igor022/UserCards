import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { userApi } from '../api';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Loading from './Loading';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  userGrid: {
    margin: theme.spacing(4, 0, 4),
    backgroundColor: theme.palette.background.paper,
  },
  usersContent: {
    minHeight: '100vh',
  },
}));

function User(props) {
  const classes = useStyles();
  

  const [user, setUser] = useState(null);
   
  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/users/');
      const userId = props.match.params.id;
      const user = data.find((user) => user._id == userId);
 
      setUser(user); 
    } catch(err) {
      throw(err);
    }
  }
  
  const handleDelete = async () => {
    try {
      await userApi.deleteUser(user._id);
      props.history.push('/users');
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={classes.usersContent}>
    { 
      user
      ? 
        <Container maxWidth="sm">
          <Grid container className={classes.userGrid} spacing={2}>
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`https://robohash.org/${user._id}`}
                  title="Image title"
                />
                <Button onClick={handleDelete} variant="contained" color="secondary">
                  Delete user
                </Button>
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5"  color="textPrimary" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {user.email}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {user.description}
              </Typography>
            </Grid>
          </Grid>
        </Container> 
        
      : <Loading />
    }
    </div>
  );
}

export default withRouter(User);