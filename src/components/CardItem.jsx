import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '75%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardItem(props) {
  const classes = useStyles();

  return(
    <Grid item key={props.card} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardHeader

          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Full Name"
          subheader="email"
        />
        <CardMedia
          className={classes.cardMedia}
          image={'https://robohash.org/' + Math.random()}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography>
            This is a media card. You can use this section to describe the content.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}