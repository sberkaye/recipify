import React, { useState, useEffect } from 'react';
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

const useRootStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    left: '50%',
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    transform: 'translate(-50%,-50%)',
    position: 'absolute',
  },
}));

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const classes = useInputStyles();
  const rootClasses = useRootStyles();

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedTerm(term), 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {}, [debouncedTerm]);

  return (
    <TextField
      className={rootClasses.root}
      variant="outlined"
      autoFocus
      onChange={setTerm}
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
