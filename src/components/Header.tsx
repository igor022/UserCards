import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  heroContent: {
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


export default function Header() {

  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Welcome to the club, buddy
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Something short and leading about the collection below—its contents, the creator, etc.
          Make it short and sweet, but not too short so folks don&apos;t simply skip over it
          entirely.
        </Typography>
      </Container>
    </div>
  );
}