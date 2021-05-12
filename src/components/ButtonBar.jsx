import React, { useState } from 'react';
// eslint-disable-next-line object-curly-newline
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

const ButtonBar = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const isMenuOpen = Boolean(anchorElement);
  const classes = useStyles();

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
          <Box className={classes.box} />
          <div className={classes.sectionDesktop}>
            <Button className={classes.button}>LOGIN</Button>
            <Button className={classes.button}>SIGNUP</Button>
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

export default ButtonBar;
