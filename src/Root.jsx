/**
 * Wrapper component to make testing the components that
 * are connected to the redux store easier.
 */
/* eslint-disable react/prop-types */
import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

export default ({ children, initialState = {} }) => (
  <Provider store={createStore(reducers, initialState, applyMiddleware(thunk))}>
    {children}
  </Provider>
);
