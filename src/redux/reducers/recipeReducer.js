import _ from 'underscore';
import { FETCH_RECIPE, FETCH_RANDOM } from '../actions/types';

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
      if (!_.find(state.recipes, (recipe) => recipe.id === action.payload.id)) {
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
    default:
      return state;
  }
};
