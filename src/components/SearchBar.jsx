import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useInputStyles = makeStyles({
  root: {
    background: '#fff',
    // when hovered
    '&:hover': {
      background: '#fff',
    },
    // what happens to the outline when hovered
    '&:hover $notchedOutline': {
      border: '1px solid #aaa',
    },
    // what happens to the outline when focused
    '&$focused $notchedOutline': {
      border: '1px solid #aaa',
    },
  },
  focused: {},
  notchedOutline: {
    border: '1px solid #ddd',
  },
});

const useRootStyles = makeStyles({
  root: {
    width: '80%',
    marginLeft: '10%',
    zIndex: 99,
    transform: 'translateY(-50%)',
  },
});

const SearchBar = () => {
  const classes = useInputStyles();
  const rootClasses = useRootStyles();
  return (
    <TextField
      className={rootClasses.root}
      variant="outlined"
      color="none"
      placeholder="Search for a recipe"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        classes,
      }}
    />
  );
};

export default SearchBar;
