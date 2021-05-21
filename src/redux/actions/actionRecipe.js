import { FETCH_RECIPE, FETCH_RANDOM, FETCH_RECIPES_BY_NAME } from './types';
import tmdb from '../../api/tmdb';
// import _ from 'underscore';

/**
 * Helper function to get API response and return a proper recipe object from it.
 * @param {object} response - API response to create a recipe object from
 * @returns a recipe object modified according to the reducer
 */
const createRecipeFromResponse = (response, index = 0) => {
  const data = response.data.meals[index];
  if (!data) {
    return {};
  }
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

const fetchRecipesByName = (searchTerm) => async (dispatch) => {
  const results = [];
  const response = await tmdb.get('/search.php', {
    params: {
      s: searchTerm,
    },
  });
  console.log('aha response: ', response);
  const { meals } = response.data;
  if (!meals) {
    dispatch({ type: FETCH_RECIPES_BY_NAME, payload: results });
    return;
  }
  meals.forEach((meal) => results.push(meal));
  dispatch({ type: FETCH_RECIPES_BY_NAME, payload: results });
};

export default { fetchRecipeById, getRandomRecipe, fetchRecipesByName };
