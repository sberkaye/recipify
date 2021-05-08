import React from 'react';
import { Container, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import headerMedium from './images/header-bg-medium.jpg';
// import headerSmall from "./images/header-bg-small.jpg";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerMedium})`,
    height: 300,
    padding: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container className={classes.headerContainer} maxWidth="xl">
        <Typography variant="h1" align="center">
          Recipify
        </Typography>
      </Container>
      <div>SEARCH</div>
    </>
  );
};

export default App;
