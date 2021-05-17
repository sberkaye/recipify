import { FETCH_RECIPE } from './types';
import tmdb from '../../api/tmdb';

const fetchRecipeById = (recipeId) => async (dispatch) => {
  const response = await tmdb.get('/lookup.php', {
    params: {
      i: recipeId,
    },
  });
  console.log('response: ', response);
  dispatch({ type: FETCH_RECIPE, payload: response });
};

export default { fetchRecipeById };
