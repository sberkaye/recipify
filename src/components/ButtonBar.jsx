import React, { useState } from 'react';
import {
  AppBar,
  makeStyles,
  Button,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import loginActions from '../redux/actions/actionLogin';

const { userLogin, userLogout } = loginActions;

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'transparent',
    position: 'absolute',
    boxShadow: 'none',
  },
  button: {
    width: '10%',
    color: '#fff',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    padding: theme.spacing(1),
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
  loginButtons: (props) => ({
    display: props.loggedIn ? 'none' : 'flex',
  }),
  profileButtons: (props) => ({
    display: props.loggedIn ? 'flex' : 'none',
  }),
  box: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  accountIcon: {
    color: theme.palette.primary.main,
  },
  accountButton: {
    transform: 'scale(1.9)',
  },
  homeButton: {
    transform: 'scale(1.7)',
  },
  profileMenu: {
    marginTop: theme.spacing(4),
  },
  profileMenuItem: {
    fontSize: '1.4rem',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
  divider: {
    border: '1px solid #aaa',
  },
}));

const ButtonBar = (props) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const isMenuOpen = Boolean(anchorElement);
  const classes = useStyles(props);

  const handleLogin = () => {
    props.userLogin();
  };

  const handleLogout = () => {
    props.userLogout();
  };

  const handleProfileMenuClose = () => {
    setAnchorElement(null);
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorElement(e.currentTarget);
  };
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={isMenuOpen}
      className={classes.profileMenu}
      keepMounted
      onClose={handleProfileMenuClose}
    >
      <MenuItem className={classes.profileMenuItem}>Signup</MenuItem>
      <Divider className={classes.divider} />
      <MenuItem className={classes.profileMenuItem}>Login</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/">
            <IconButton>
              <HomeRoundedIcon className={classes.homeButton} color="primary" />
            </IconButton>
          </Link>
          <Box className={classes.box} />
          <div className={classes.sectionDesktop}>
            <Button
              onClick={handleLogin}
              className={clsx(classes.button, classes.loginButtons)}
            >
              LOGIN
            </Button>
            <Button className={clsx(classes.button, classes.loginButtons)}>
              SIGNUP
            </Button>
            <Button
              onClick={handleLogout}
              className={clsx(classes.button, classes.profileButtons)}
            >
              LOGOUT
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              className={classes.accountButton}
              onClick={handleProfileMenuOpen}
            >
              <AccountCircleIcon className={classes.accountIcon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
    </>
  );
};

ButtonBar.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { userLogin, userLogout })(ButtonBar);
