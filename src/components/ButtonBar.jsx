import React from 'react';
// eslint-disable-next-line object-curly-newline
import { AppBar, makeStyles, Button, Toolbar, Box } from '@material-ui/core';

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
}));

const ButtonBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Box className={classes.box} />
        <Button className={classes.button}>LOGIN</Button>
        <Button className={classes.button}>SIGNUP</Button>
      </Toolbar>
    </AppBar>
  );
};

export default ButtonBar;
