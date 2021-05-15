import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <CssBaseline />
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
  </>
);

export default App;
