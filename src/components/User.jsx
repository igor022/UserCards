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
import Box from '@material-ui/core/Box';
import Loading from './Loading';
import EditUserForm from './EditUserForm';
import Tags from './Tags.jsx';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '120%', // 16:9
  },
  userGrid: {
    margin: theme.spacing(4, 0, 2),
    backgroundColor: theme.palette.background.paper,
  },
  usersContent: {
    minHeight: '100vh',
  },
  deleteButton: {
    width: '100%',
  },
  aboutMe: {
    margin: theme.spacing(2, 0, 4, 0),
  },
  aboutText: {
    textAlign: 'justify',
  }
}));

const User = (props) => {
  const classes = useStyles();
  
  const [editForm, setEditForm] = useState({});
  const [user, setUser] = useState(null);
   
  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/users/');
      const userId = props.match.params.id;
      const user = data.find((user) => user._id == userId);
      if (!user) {
        props.history.push('/404');
        return;
      }
      setUser(user); 
    } catch(err) {
      throw(err);
    }
  }
  
  const editUser = async (edited) => {
    try {
      const editedUser = await userApi.editUser(edited);
      setUser(editedUser);
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

  const addTag = (tag) => {
    const edited = {...user};
    edited.tags.push(tag);
    editUser(edited);
  }

  const deleteTag = (tag) => {
    const edited = {...user};
    edited.tags.splice(edited.tags.findIndex((t) => t == tag), 1);
    editUser(edited);
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
                >
                  
                </CardMedia>
                
              </Card>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5"  color="textPrimary" gutterBottom>
                {user.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {user.email}
              </Typography>   
              
            </Grid>
          </Grid>
          <Tags tags={user.tags} addTag={addTag} deleteTag={deleteTag} className={classes.tags}/>
          <hr></hr>
          <div className={classes.aboutMe}>
            <Typography variant="h4" color="textPrimary" gutterBottom>
              About me
            </Typography>
            <Typography className={classes.aboutText} variant="body1" color="textPrimary" gutterBottom>
              {user.description}
            </Typography>
          </div>

          <EditUserForm user={user} editUser={editUser}/>
          <Button className={classes.deleteButton} onClick={handleDelete} variant="contained" color="secondary">
            Delete user
          </Button>
        </Container> 
        
      : <Loading />
    }
    </div>
  );
}

export default withRouter(User);