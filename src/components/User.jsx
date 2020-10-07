import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


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
  console.log(props.match.params);
  const classes = useStyles();
  const userId = props.match.params.id;
  return (
    <div>
      <Container smaxWidth="sm">
        <Grid className={classes.userGrid} container spacing={2}>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={`https://robohash.org/${userId}`}
                title="Image title"
              />
              <Button variant="contained" color="secondary">
                Delete user
              </Button>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5"  color="textPrimary" gutterBottom>
              Igor Igor
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              igor@gmail.com
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Мы узнали, что с помощью useEffect, мы можем вызывать разные побочные эффекты после того, как компонент отрендерится. Некоторым эффектам нужен сброс, поэтому они возвращают соответствующую функцию.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default User;