import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles } from '@material-ui/core';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Header from './components/Header';
import Footer from './components/Footer';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    maxWidth: '100vw',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid container direction="row" className={classes.root}>
        {/* Header, Routes and Footer all return Grid items,
        no need to put them inside Grid items here */}
        <Header />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/recipe/:id" exact component={Recipe} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </Grid>
    </>
  );
};

export default App;
