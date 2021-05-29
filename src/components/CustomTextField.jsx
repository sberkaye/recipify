/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */

// Custom implementation of the TextField component of Material UI
// to keep input elements' style consistent across the whole site
import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useInputStyles = makeStyles({
  root: {
    background: '#fff',
    border: 'none',
    boxShadow: '0 1px 1px #bbb',
    // when hovered
    '&:hover': {
      background: '#fff',
    },
  },
  focused: {},
  notchedOutline: {
    border: 'none',
  },
});

const CustomTextField = (props) => {
  const classes = useInputStyles();
  return (
    <TextField
      {...props}
      autoComplete="off"
      InputProps={{ ...props.InputProps, classes }}
    />
  );
};

export default CustomTextField;
