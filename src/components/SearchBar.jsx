/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Tag from './Tag';
import CustomTextField from './CustomTextField';
import recipeActions from '../redux/actions/actionRecipe';

const { fetchRecipesByName } = recipeActions;

const useRootStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99,
    // boxShadow: '0 1px 1px #aaa',
    border: 'none',
    left: '50%',
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    transform: 'translate(-50%,-50%)',
    position: 'absolute',
  },
  searchIcon: {
    color: '#555',
  },
  list: {
    zIndex: 100,
    width: '80%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, 1rem)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    background: '#fff',
  },
  listItem: {
    '&:hover': {
      background: '#eee',
    },
  },
  activeListItem: {
    background: '#eee',
  },
  secondaryActions: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
}));

const SearchBar = (props) => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [cursorPosition, setCursorPosition] = useState(0);
  const rootClasses = useRootStyles();
  const { results } = props;
  const history = useHistory();

  // key codes
  const ARROW_UP = 38;
  const ARROW_DOWN = 40;
  const ENTER = 13;

  const handleArrowKeyPress = (event) => {
    if (
      event.keyCode === ARROW_DOWN &&
      cursorPosition < (results.length > 5 ? 5 : results.length)
    ) {
      event.preventDefault();
      setCursorPosition((pos) => pos + 1);
    } else if (event.keyCode === ARROW_UP && cursorPosition > 0) {
      event.preventDefault();
      setCursorPosition((pos) => pos - 1);
    } else if (event.keyCode === ENTER && cursorPosition !== 0) {
      setTerm('');
      setCursorPosition(0);
      history.push(`/recipe/${results[cursorPosition - 1].id}`);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    props.fetchRecipesByName(debouncedTerm);
  }, [debouncedTerm]);

  const renderSearchResults = () =>
    results.map(
      ({ name, id, tags }, resultsIndex) =>
        resultsIndex < 5 && (
          <Link
            className={rootClasses.link}
            to={`/recipe/${id}`}
            onClick={() => setTerm('')}
            key={uuidv4()}
          >
            <ListItem
              button
              className={clsx(
                rootClasses.listItem,
                cursorPosition - 1 === resultsIndex &&
                  rootClasses.activeListItem,
              )}
              divider={
                results.length < 5
                  ? !(resultsIndex === results.length - 1)
                  : !(resultsIndex === 4)
              }
            >
              <ListItemText primary={name} />
              <ListItemSecondaryAction className={rootClasses.secondaryActions}>
                {tags &&
                  tags.map(
                    (tag, index) =>
                      index < 3 && (
                        <Tag key={uuidv4()} sm type="tag">
                          {tag}
                        </Tag>
                      ),
                  )}
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        ),
    );

  return (
    <div style={{ position: 'relative' }}>
      <CustomTextField
        className={rootClasses.root}
        variant="outlined"
        autoFocus
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleArrowKeyPress}
        value={term}
        placeholder="Search for a recipe"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={rootClasses.searchIcon} />
            </InputAdornment>
          ),
        }}
      />

      {results.length ? (
        <List className={rootClasses.list}>{renderSearchResults()}</List>
      ) : (
        <div style={{ display: 'none' }} />
      )}
    </div>
  );
};

SearchBar.propTypes = {
  fetchRecipesByName: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string }))
    .isRequired,
};

const mapStateToProps = (state) => ({
  results: state.recipes.searchResults,
});

export default connect(mapStateToProps, { fetchRecipesByName })(SearchBar);
