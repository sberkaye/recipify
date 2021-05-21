import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircleLoader from 'react-spinners/CircleLoader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mainBgMedium from '../images/main-bg-medium.jpg';
import mainBgSmall from '../images/main-bg-small.jpg';
import FoodCard from '../components/FoodCard';

import recipeActions from '../redux/actions/actionRecipe';

const { getRandomRecipe } = recipeActions;

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(rgba(255, 136, 0, 0.7), rgba(255, 136, 0, 0.7)), url(${mainBgMedium})`,
    padding: theme.spacing(7),
    maxWidth: '100%',
    minHeight: '100%',
    flexGrow: 1,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `linear-gradient(rgba(255, 136, 0, 0.7), rgba(255, 136, 0, 0.7)), url(${mainBgSmall})`,
    },
  },
  spinner: {
    minHeight: '100vh',
    flexGrow: 1,
  },
}));

const Home = (props) => {
  const [cardCount, setCardCount] = useState(0);
  const [screenSize, setScreenSize] = useState(null); // to communicate the screen size to the cards
  // eslint-disable-next-line no-shadow
  const { recipes, getRandomRecipe } = props;

  /**
   * A helper method to determine the number of FoodCard components
   * to be rendered depending on the screen size
   */
  const handleCardCount = () => {
    const width = window.innerWidth;
    if (width <= breakpoints.sm) {
      setCardCount(4); // 4 rows, 1 card each
      setScreenSize('xs');
    } else if (breakpoints.sm < width && width <= breakpoints.md) {
      setCardCount(6); // 3 rows, 2 card each
      setScreenSize('sm');
    } else if (breakpoints.md < width && width <= breakpoints.lg) {
      setCardCount(9); // 3 rows, 3 card each
      setScreenSize('md');
    } else if (breakpoints.lg < width && width <= breakpoints.xl) {
      setCardCount(12); // 3 rows, 4 card each
      setScreenSize('lg');
    } else {
      setCardCount(18); // 3 rows, 6 card each
      setScreenSize('xl');
    }
  };

  // decide the number of cards to render depending on the screen size,
  // and set an event listener to change the card count if user
  // resizes his/her screen
  useEffect(() => {
    window.addEventListener('resize', handleCardCount);
    handleCardCount();
  }, []);

  // whenever the card count is updated with a positive number and there are not enough cards,
  // get required number of random recipes to complement
  useEffect(() => {
    if (cardCount > 0 && recipes.length < cardCount) {
      getRandomRecipe(cardCount - recipes.length);
    }
  }, [cardCount]);

  const classes = useStyles();

  const renderCards = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    recipes.map((recipe) => (
      <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <FoodCard size={screenSize} cardDetails={recipe} />
      </Grid>
    ));

  return recipes.length ? (
    <Grid container item className={classes.root} spacing={4} align="center">
      {renderCards()}
    </Grid>
  ) : (
    <Grid
      item
      container
      xs={12}
      align="center"
      alignItems="center"
      justify="center"
      className={classes.spinner}
    >
      <CircleLoader />
    </Grid>
  );
};

Home.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getRandomRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes,
});

export default connect(mapStateToProps, { getRandomRecipe })(Home);
