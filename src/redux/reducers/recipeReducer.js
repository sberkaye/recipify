import { FETCH_RECIPE, FETCH_RANDOM } from '../actions/types';

const INITIAL_STATE = [
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
];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RECIPE:
      return [action.payload];
    case FETCH_RANDOM:
      console.log('action.payload: ', action.payload);
      console.log('sa: ', [...action.payload]);
      return [...action.payload];
    default:
      return state;
  }
};
