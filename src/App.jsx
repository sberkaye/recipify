import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Typography, CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import headerMedium from './images/header-bg-medium.jpg';
// import headerSmall from "./images/header-bg-small.jpg";
import mainBgMedium from './images/main-bg-medium.jpg';
import SearchBar from './components/SearchBar';
import FoodCard from './components/FoodCard';
import ButtonBar from './components/ButtonBar';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerMedium})`,
    height: 250,
    padding: theme.spacing(4),
    // increase padding in smaller screens to have space between buttons and title
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6),
    },
  },
  mainGrid: {
    backgroundImage: `linear-gradient(rgba(255, 136, 0, 0.7), rgba(255, 136, 0, 0.7)), url(${mainBgMedium})`,
    padding: theme.spacing(7),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      {/* ---------- GENERAL GRID ---------- */}
      <Grid container direction="column" align="center">
        {/* ---------- GRID FOR HEADER ---------- */}
        <Grid item container direction="column">
          <ButtonBar />
          {/* ---------- HEADER BACKGROUND & TITLE ---------- */}
          <Grid item>
            <Container className={classes.headerContainer} maxWidth="xl">
              <Typography variant="h1" align="center">
                Recipify
              </Typography>
            </Container>
          </Grid>
          {/* ---------- SEARCHBAR ---------- */}
          <Grid item xs={12} sm={6}>
            <SearchBar />
          </Grid>
        </Grid>
        {/* ---------- GRID FOR THE HEADER ENDS ---------- */}
        {/* ----------------------------------------------- */}
        {/* ---------- GRID FOR THE MAIN SECTION ---------- */}
        <Grid container item className={classes.mainGrid} spacing={3}>
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
      </Grid>
    </>
  );
};

export default App;
