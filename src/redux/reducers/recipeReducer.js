/* eslint-disable operator-linebreak */
import _ from 'underscore';
import {
  FETCH_RECIPE,
  FETCH_RANDOM,
  FETCH_RECIPES_BY_NAME,
  REMOVE_RECIPE,
} from '../actions/types';

/*
  How a recipe object should look like:
  {
    id: '',
    name: '',
    category: '',
    area: '',
    instructions: '',
    imgLink: '',
    tags: [],
    videoLink: '',
    ingredients: [],
    measures: [],
  },
 */

const INITIAL_STATE = {
  recipes: [],
  searchResults: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPE:
      // if the recipe is not present in the store, add it
      if (!_.find(state.recipes, (rec) => rec.id === action.payload.id)) {
        return {
          ...state,
          recipes: [...state.recipes, action.payload],
        };
      }
      return state;
    case FETCH_RANDOM:
      return {
        ...state,
        recipes: [...state.recipes, ...action.payload],
      };
    case FETCH_RECIPES_BY_NAME:
      return {
        ...state,
        searchResults: action.payload,
      };
    case REMOVE_RECIPE: {
      const index = state.recipes.findIndex((rec) => rec.id === action.payload);
      return {
        ...state,
        recipes: [
          ...state.recipes.slice(0, index),
          ...state.recipes.slice(index + 1),
        ],
      };
    }
    default:
      return state;
  }
};
