import { FETCH_RECIPE } from '../actions/types';

const INITIAL_STATE = {
  id: '',
  name: '',
  category: '',
  instructions: '',
  imgLink: '',
  videoLink: '',
  ingredients: [],
  measures: [],
};

export default (state = INITIAL_STATE, action) => {
  const {
    id,
    name,
    category,
    instructions,
    imgLink,
    videoLink,
    ingredients,
    measures,
  } = action.payload;
  switch (action.type) {
    case FETCH_RECIPE:
      return {
        ...state,
        id,
        name,
        category,
        instructions,
        imgLink,
        videoLink,
        ingredients,
        measures,
      };
    default:
      return state;
  }
};
