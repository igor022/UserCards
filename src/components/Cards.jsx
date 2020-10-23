import React from 'react';

import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardItem from './CardItem';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));


const Cards = (props) => {
  
  const users = props.users;
  const classes = useStyles();

  return(
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {
          props.isLoading 
          ? <h2>Loading...</h2>
          : (
            users && users.length
            ? 
            users
              .slice(0, props.cardsAmount)
              .map((user, i) => (
                <CardItem 
                  key={user._id} 
                  user={user} 
                >
                </CardItem>
              )
            )
            : (
              <p>No users</p>
            )
          )

        }
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({ isLoading: state.isLoading });

export default connect(mapStateToProps)(Cards);