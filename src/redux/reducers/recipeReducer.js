/* eslint-disable operator-linebreak */
import {
  FETCH_RECIPE,
  FETCH_RANDOM,
  FETCH_RECIPES_BY_NAME,
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
  currentRecipe: {},
  searchResults: [],
  randoms: [],
  fetchedRecipes: [], // to not fetch the same recipe multiple times from the API
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPE:
      return {
        ...state,
        fetchedRecipes: state.fetchedRecipes.find(
          (r) => r.id === action.payload.id,
        )
          ? state.fetchedRecipes
          : [...state.fetchedRecipes, action.payload],
        currentRecipe: action.payload,
      };
    case FETCH_RANDOM:
      return {
        ...state,
        fetchedRecipes: [...state.fetchedRecipes, ...action.payload],
        randoms: [...state.randoms, ...action.payload],
      };
    case FETCH_RECIPES_BY_NAME:
      return {
        ...state,
        fetchedRecipes: state.fetchedRecipes.find(
          (r) => r.id === action.payload.id,
        )
          ? state.fetchedRecipes
          : [...state.fetchedRecipes, action.payload],
        searchResults: action.payload,
      };
    default:
      return state;
  }
};
