/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  // List,
  // ListItem,
  // ListItemText,
  // ListItemSecondaryAction,
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
// import Tag from './Tag';

import recipeActions from '../redux/actions/actionRecipe';

const { fetchRecipesByName } = recipeActions;

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
  list: {
    zIndex: 99,
    left: '50%',
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    transform: 'translateX(-50%)',
    position: 'absolute',
  },
}));

const SearchBar = (props) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const classes = useInputStyles();
  const rootClasses = useRootStyles();
  // const { results } = props;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    props.fetchRecipesByName(debouncedTerm);
  }, [debouncedTerm]);

  // const renderSearchResults = () =>
  //   // eslint-disable-next-line implicit-arrow-linebreak
  //   results.map(({ name, id, tags }) => (
  //     <Link to={`/recipe/${id}`}>
  //       <ListItem button divider>
  //         <ListItemText primary={name} />
  //         <ListItemSecondaryAction>
  //           {tags && tags.map((tag) => <Tag type="tag">{tag}</Tag>)}
  //         </ListItemSecondaryAction>
  //       </ListItem>
  //     </Link>
  //   ));

  return (
    <>
      <TextField
        className={rootClasses.root}
        variant="outlined"
        autoFocus
        onChange={(e) => {
          setTerm(e.target.value);
        }}
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
      {/* {results.length ? (
        <List className={rootClasses.list}>{renderSearchResults()}</List>
      ) : (
        <div style={{ display: 'none' }} />
      )} */}
    </>
  );
};

SearchBar.propTypes = {
  fetchRecipesByName: PropTypes.func.isRequired,
  // results: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  results: state.recipes.searchResults,
});

export default connect(mapStateToProps, { fetchRecipesByName })(SearchBar);
