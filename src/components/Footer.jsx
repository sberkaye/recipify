import React from 'react';
import { makeStyles, Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: '#333',
    color: '#ddd',
    padding: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Grid item xs>
      <Box className={classes.footer}>Footer</Box>
    </Grid>
  );
};

export default Footer;
