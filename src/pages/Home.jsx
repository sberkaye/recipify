import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CircleLoader from 'react-spinners/CircleLoader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import mainBgMedium from '../images/main-bg-medium.jpg';
import mainBgSmall from '../images/main-bg-small.jpg';
import FoodCard from '../components/FoodCard';

import useScreenSize from '../hooks/useScreenSize';

import recipeActions from '../redux/actions/actionRecipe';

const { getRandomRecipes, removeRecipe } = recipeActions;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(rgba(255, 136, 0, 0.7), rgba(255, 136, 0, 0.7)), url(${mainBgMedium})`,
    padding: theme.spacing(7),
    minHeight: '100%',
    maxWidth: '100%',
    flexGrow: 1,
    margin: '0',
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `linear-gradient(rgba(255, 136, 0, 0.7), rgba(255, 136, 0, 0.7)), url(${mainBgSmall})`,
    },
  },
  spinner: {
    minHeight: '100vh',
    flexGrow: 1,
    paddingTop: '5rem',
  },
}));

const Home = (props) => {
  const [cardCount, setCardCount] = useState(0);
  const [screenSize, calculateSize] = useScreenSize();
  // eslint-disable-next-line no-shadow
  const { randoms, getRandomRecipes, removeRecipe } = props;

  /**
   * A helper method to determine the number of FoodCard components
   * to be rendered depending on the screen size
   */
  const handleCardCount = () => {
    switch (screenSize) {
      case 'xs':
        setCardCount(4); // 4 rows, 1 card each
        break;
      case 'sm':
        setCardCount(6); // 3 rows, 2 card each
        break;
      case 'md':
        setCardCount(9); // 3 rows, 3 card each
        break;
      case 'lg':
        setCardCount(12); // 3 rows, 4 card each
        break;
      case 'xl':
        setCardCount(18); // 3 rows, 6 card each
        break;
      default:
        break;
    }
  };

  // set an event listener to determine the screen size if user
  // resizes his/her screen
  useEffect(() => {
    window.addEventListener('resize', calculateSize);
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, []);

  // decide the number of cards to be shown depending on
  // user's screen size
  useEffect(() => handleCardCount(), [screenSize]);

  // whenever the card count is updated with a positive number and there are not enough cards,
  // get required number of random recipes to complement
  useEffect(() => {
    if (randoms.length === 1) {
      removeRecipe(randoms[0].id);
    }
    if (randoms.length < cardCount) {
      getRandomRecipes(cardCount - randoms.length);
    }
  }, [cardCount]);

  const classes = useStyles();
  const theme = useTheme();

  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < cardCount; i += 1) {
      cards.push(
        <Grid key={randoms[i].id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FoodCard size={screenSize} cardDetails={randoms[i]} />
        </Grid>,
      );
    }
    return cards;
  };

  return randoms.length === cardCount || randoms.length > cardCount ? (
    <Grid container item className={classes.root} spacing={4} align="center">
      {renderCards()}
    </Grid>
  ) : (
    <Grid
      item
      container
      xs={12}
      align="center"
      alignItems="flex-start"
      justify="center"
      className={classes.spinner}
    >
      <CircleLoader color={theme.palette.primary.main} />
    </Grid>
  );
};

Home.propTypes = {
  randoms: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string }))
    .isRequired,
  getRandomRecipes: PropTypes.func.isRequired,
  removeRecipe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  randoms: state.recipes.randoms,
});

export default connect(mapStateToProps, { getRandomRecipes, removeRecipe })(
  Home,
);
