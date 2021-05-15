import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import headerSmall from "./images/header-bg-small.jpg";
import mainBgMedium from '../images/main-bg-medium.jpg';

import FoodCard from '../components/FoodCard';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundImage: `linear-gradient(rgba(255, 136, 0, 0.7), rgba(255, 136, 0, 0.7)), url(${mainBgMedium})`,
    padding: theme.spacing(7),
    maxWidth: '100%',
    minHeight: '100%',
    margin: 0,
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainGrid} spacing={4} align="center">
      <Grid item xs={12} sm={6} md={4}>
        <FoodCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FoodCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FoodCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FoodCard />
      </Grid>
    </Grid>
  );
};

export default Home;
