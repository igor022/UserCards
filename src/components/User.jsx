import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
    padding: theme.spacing(4, 0, 4),
  },
}));

function User(props) {
  const classes = useStyles();
  

  const [user, setUser] = useState(null);
   
  const getUsers = async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      const userId = props.match.params.id;
      const user = data.find((user) => user.id == userId);
 
      setUser(user); 
    } catch(err) {
      throw(err);
    }
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    { 
      user
      ? 
      
        <Container maxWidth="sm">
          <Grid className={classes.userGrid} container spacing={2}>
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`https://robohash.org/${user.id}`}
                  title="Image title"
                />
                <Button variant="contained" color="secondary">
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
              {user.company.catchPhrase}
              </Typography>
            </Grid>
          </Grid>
        </Container> 
        
      : 'loading...'
    }
    </>
  );
}

export default User;