import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper,
    color: 'rgb(0, 0, 0)'
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
  },
  signup: {
    textDecoration: 'none',
    color: 'white'
  },
  auth: {
    marginLeft: theme.spacing(2),
  },
}));

const NavBar = (props) => {
  const classes = useStyles();


  const handleLogout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('jwt');
    props.history.push('/auth/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          

          <NavLink className={classes.navLink} to="/">
            <Typography variant="h6" className={classes.title}>
              RoboClub
            </Typography>
          </NavLink>

          {
            localStorage.getItem('jwt') 
            && (
              <div>
                <Button color="inherit">
                  <NavLink className={classes.navLink} to="/users">Users</NavLink>
                </Button>
                <Button className={classes.auth} color="inherit" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            )
          }
          {
            !localStorage.getItem('jwt')
            && (
              <div className={classes.auth}>  
                <Button color="inherit">
                  <NavLink className={classes.navLink} to="/auth/login">Log in</NavLink>
                </Button>
                <Button variant="contained" color="primary">
                  <NavLink className={classes.signup} to="/auth/signup">Sign up</NavLink>
                </Button>
              </div>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar);