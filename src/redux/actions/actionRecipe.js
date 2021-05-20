import { FETCH_RECIPE, FETCH_RANDOM } from './types';
import tmdb from '../../api/tmdb';
// import _ from 'underscore';

/**
 * Helper function to get API response and return a proper recipe object from it.
 * @param {object} response - API response to create a recipe object from
 * @returns a recipe object modified according to the reducer
 */
const createRecipeFromResponse = (response) => {
  const data = response.data.meals[0];
  const {
    idMeal,
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strTags,
    strYoutube,
  } = data;
  const ingredients = [];
  const measures = [];
  // Add each non-empty ingredient and measure to corresponding arrays
  Object.keys(data).forEach((key) => {
    if (key.includes('Ingredient') && data[key]) {
      ingredients.push(data[key]);
    }
    if (key.includes('Measure') && data[key]) {
      measures.push(data[key]);
    }
  });

  return {
    id: idMeal,
    name: strMeal,
    category: strCategory,
    area: strArea,
    instructions: strInstructions,
    imgLink: strMealThumb,
    tags: strTags ? strTags.split(',') : '',
    videoLink: strYoutube,
    ingredients,
    measures,
  };
};

/**
 * Get a recipe into the redux store by its ID.
 * @param {number} recipeId - ID number of the recipe
 */
const fetchRecipeById = (recipeId) => async (dispatch) => {
  const response = await tmdb.get('/lookup.php', {
    params: {
      i: recipeId,
    },
  });
  const recipe = createRecipeFromResponse(response);
  dispatch({ type: FETCH_RECIPE, payload: recipe });
};

/**
 * Get a number of random recipes and store them in the redux store.
 * @param {number} count - count of the recipes that will be stored
 */
const getRandomRecipe = (count) => async (dispatch) => {
  const randoms = [];
  const promises = [];
  while (promises.length < count) {
    promises.push(tmdb.get('/random.php'));
  }
  const results = await Promise.all(promises);
  results.forEach((res) => randoms.push(createRecipeFromResponse(res)));
  dispatch({ type: FETCH_RANDOM, payload: randoms });
};

export default { fetchRecipeById, getRandomRecipe };
