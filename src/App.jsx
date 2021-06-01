import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline, Grid } from '@material-ui/core';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <CssBaseline />
    <Grid container direction="column" spacing={0}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipe/:id" exact component={Recipe} />
        </Switch>
      </BrowserRouter>
    </Grid>
    <Footer />
  </>
);

export default App;
