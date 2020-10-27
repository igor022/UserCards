import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteUser } from '../actions/userActions';
import { getProjects } from '../actions/projectActions';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


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
    paddingTop: '75%',
  },
  cardContent: {
    flexGrow: 1,
  },
  avatar: {
    backgroundColor: red[500],
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  }
}));

const CardItem = (props) => {
  const classes = useStyles();
  const { user } = props;
  
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);


  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return(
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardHeader
          action={
            localStorage.getItem('jwt') && (      
              <div>
                <IconButton 
                  aria-label="settings"
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                <MoreVertIcon />  
                </IconButton>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>
                              <Link className={classes.link} to={`/users/${user._id}`}>Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={() => props.deleteUser(user._id)}>Delete</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>        
            )
          }
          title={user.name}
          subheader={user.email}
        />
        <CardMedia
          className={classes.cardMedia}
          image={user.imageUrl && user.imageUrl.length > 0 ? user.imageUrl : `https://robohash.org/${user._id}`}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography>
            {
              user.description.length > 40
              ? `${user.description.slice(0, 40)}...`
              : user.description
            }       
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => { dispatch(deleteUser(id))}
  }
}

export default connect(undefined, mapDispatchToProps)(CardItem);