import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import SearchList from './pages/SearchList';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <>
    <CssBaseline />
    <Header />
    <BrowserRouter>
      <Switch>
        <Route path="/recipe/:id" exact component={Recipe} />
        <Route path="/search/:searchTerm" exact component={SearchList} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
    <Footer />
  </>
);

export default App;
