import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid, Container, Typography, makeStyles } from '@material-ui/core';
import headerMedium from '../images/header-bg-medium.jpg';
import headerSmall from '../images/header-bg-small.jpg';
import SearchBar from './SearchBar';
import ButtonBar from './ButtonBar';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerMedium})`,
    backgroundPosition: 'top',
    height: 250,
    maxWidth: '100%',
    padding: theme.spacing(4),
    // increase padding in smaller screens to have space between buttons and title
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6),
      maxWidth: '100%',
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${headerSmall})`,
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Grid item container direction="column" spacing={0}>
      <ButtonBar />
      <Grid item>
        <Container className={classes.headerContainer}>
          <Typography variant="h1" align="center">
            Recipify
          </Typography>
        </Container>
      </Grid>
      <Grid item>
        <SearchBar />
      </Grid>
    </Grid>
  );
};

export default Header;
