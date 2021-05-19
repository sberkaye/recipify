import React from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: '#333',
    color: '#ddd',
    padding: theme.spacing(2),
    height: '3.6rem',
    bottom: 0,
    width: '100%',
  },
}));

const Footer = () => {
  const classes = useStyles();

  return <Box className={classes.footer}>Footer</Box>;
};

export default Footer;
