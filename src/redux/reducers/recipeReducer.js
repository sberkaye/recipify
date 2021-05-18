import { FETCH_RECIPE } from '../actions/types';

const INITIAL_STATE = {
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
};

export default (state = INITIAL_STATE, action) => {
  let recipeObj = { ...state };
  if (action.type === FETCH_RECIPE) {
    recipeObj = action.payload;
  }
  switch (action.type) {
    case FETCH_RECIPE:
      return {
        ...state,
        ...recipeObj,
      };
    default:
      return state;
  }
};
