/* eslint-disable object-curly-newline */
import React, { useState, /* useEffect, useRef, */ forwardRef } from 'react';
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
  Slide,
  Snackbar,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import SignupModal from './auth/modals/SignupModal';
import LoginModal from './auth/modals/LoginModal';
import recipifyIconMedium from '../assets/recipify_64x64.png';
import recipifyIconSmall from '../assets/recipify_32x32.png';
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
  homeButton: {},
  profileMenu: {
    marginTop: theme.spacing(4),
  },
  profileMenuItem: {
    fontSize: '1.4rem',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
  profileMenuLoginItem: (props) => ({
    display: props.loggedIn ? 'none' : 'flex',
  }),
  profileMenuLogoutItem: (props) => ({
    display: props.loggedIn ? 'flex' : 'none',
  }),
  divider: (props) => ({
    display: props.loggedIn ? 'none' : 'flex',
    border: '1px solid #aaa',
  }),
}));

const Transition = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const ButtonBar = (props) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignupSnackbar, setShowSignupSnackbar] = useState(false);
  const [showLoginSnackbar, setShowLoginSnackbar] = useState(false);
  // const auth = useRef();
  const isMenuOpen = Boolean(anchorElement);
  const classes = useStyles(props);

  // this callback will get isSignedIn as an argument from our auth object and will run
  // whenever auth.isSignedIn changes because it is assigned as the event listener
  // by the "listen" method below.
  // const handleAuthChange = (isSignedIn) => {
  //   if (isSignedIn) {
  //     props.userLogin(auth.current.currentUser.get().getId());
  //   } else {
  //     props.userLogout();
  //   }
  // };

  // initialize GAPI and set up event listeners to modify
  // the redux store when user signs in or out
  /*
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      // this callback will be called after Google API finishes loading the required library
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          // After everything is ready, connect the auth instance to this component
          auth.current = window.gapi.auth2.getAuthInstance();
          // Immediately update the auth state in redux store
          handleAuthChange(auth.current.isSignedIn.get());
          // Set an event listener to handle the situation whenever auth.isSignedIn changes
          auth.current.isSignedIn.listen(handleAuthChange);
        });
    });
  }, []);
  */

  const handleSignOutClick = () => {
    // auth.current.signOut();
    props.userLogout();
  };

  const handleProfileMenuClose = () => {
    setAnchorElement(null);
  };

  const handleProfileMenuOpen = (e) => {
    setAnchorElement(e.currentTarget);
  };

  const renderSignupSnackbar = (
    <Snackbar
      open={showSignupSnackbar}
      onClose={() => {
        setShowSignupSnackbar(false);
      }}
      autoHideDuration={1000}
      TransitionComponent={Transition}
      message="Verification e-mail sent"
    />
  );

  const renderLoginSnackbar = (
    <Snackbar
      open={showLoginSnackbar}
      onClose={() => {
        setShowLoginSnackbar(false);
      }}
      autoHideDuration={1000}
      TransitionComponent={Transition}
      message="Login successful!"
    />
  );

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
      <MenuItem
        onClick={() => {
          setAnchorElement(null);
          setShowSignup(true);
        }}
        className={clsx(classes.profileMenuItem, classes.profileMenuLoginItem)}
      >
        Signup
      </MenuItem>
      <Divider className={classes.divider} />
      <MenuItem
        onClick={() => {
          setAnchorElement(null);
          setShowLogin(true);
        }}
        className={clsx(classes.profileMenuItem, classes.profileMenuLoginItem)}
      >
        Login
      </MenuItem>
      <MenuItem
        onClick={() => {
          setAnchorElement(null);
          props.userLogout();
        }}
        className={clsx(classes.profileMenuItem, classes.profileMenuLogoutItem)}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const renderSignupForm = (
    <SignupModal
      open={showSignup}
      handleOpen={setShowSignup}
      showSnackbar={setShowSignupSnackbar}
    />
  );

  const renderLoginForm = (
    <LoginModal
      open={showLogin}
      handleOpen={setShowLogin}
      showSnackbar={setShowLoginSnackbar}
    />
  );

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Link to="/">
            <IconButton>
              <img
                srcSet={`${recipifyIconSmall} 32w, ${recipifyIconMedium} 64w`}
                sizes="(max-width: 675px) 32px, 64px"
                src={recipifyIconMedium}
                alt="Logo"
              />
            </IconButton>
          </Link>
          <Box className={classes.box} />
          <div className={classes.sectionDesktop}>
            <Button
              onClick={() => {
                setShowLogin(true);
              }}
              className={clsx(classes.button, classes.loginButtons)}
            >
              LOGIN
            </Button>
            <Button
              onClick={() => {
                setShowSignup(true);
              }}
              className={clsx(classes.button, classes.loginButtons)}
            >
              SIGNUP
            </Button>
            <Button
              onClick={handleSignOutClick}
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
      {renderSignupForm}
      {renderLoginForm}
      {renderSignupSnackbar}
      {renderLoginSnackbar}
    </>
  );
};

ButtonBar.propTypes = {
  userLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { userLogin, userLogout })(ButtonBar);
