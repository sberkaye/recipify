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

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPE:
      // if the recipe is not present in the store, add it
      if (!_.find(state, (recipe) => recipe.id === action.payload.id)) {
        return [...state, action.payload];
      }
      return state;
    case FETCH_RANDOM:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
