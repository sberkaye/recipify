import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid, Container, Typography, makeStyles } from '@material-ui/core';
import headerMedium from '../images/header-bg-medium.jpg';
import headerSmall from '../images/header-bg-small.jpg';
import SearchBar from './SearchBar';
import ButtonBar from './ButtonBar';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${headerMedium})`,
    backgroundPosition: 'bottom',
    height: 250,
    maxWidth: '100%',
    padding: theme.spacing(4),
    // increase padding in smaller screens to have space between buttons and title
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6),
      maxWidth: '100%',
      letterSpacing: '0px',
      backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${headerSmall})`,
      backgroundPosition: 'bottom',
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(10),
      letterSpacing: '0rem',
      maxWidth: '100%',
    },
  },
  headerTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.8rem',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Grid item container direction="column" spacing={0}>
      <Grid item>
        <ButtonBar />
      </Grid>
      <Grid item container alignItems="center">
        <Container disableGutters className={classes.headerContainer}>
          <Typography
            className={classes.headerTitle}
            variant="h1"
            align="center"
          >
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
