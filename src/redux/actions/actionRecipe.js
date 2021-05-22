import {
  FETCH_RECIPE,
  FETCH_RANDOM,
  FETCH_RECIPES_BY_NAME,
  REMOVE_RECIPE,
} from './types';
import tmdb from '../../api/tmdb';

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
 * Get a random recipe from the API
 * @returns random recipe object
 */
const getRandomRecipe = async () => {
  const response = await tmdb.get('/random.php');
  return createRecipeFromResponse(response);
};

/**
 * Get a number of random recipes and store them in the redux store.
 * @param {number} count - count of the recipes that will be stored
 */
const getRandomRecipes = (count) => async (dispatch) => {
  const randoms = new Set();
  const promises = [];
  while (promises.length < count) {
    promises.push(tmdb.get('/random.php'));
  }
  const promiseResults = await Promise.all(promises);
  promiseResults.forEach((res) => randoms.add(createRecipeFromResponse(res)));
  while (randoms.size < count) {
    randoms.add(getRandomRecipe());
  }
  dispatch({ type: FETCH_RANDOM, payload: randoms });
};

/**
 * Fetch recipes from API by their name, if their name completely or
 * partially matches the search term.
 * @param {string} searchTerm - name of the recipe that is searched
 */
const fetchRecipesByName = (searchTerm) => async (dispatch) => {
  const results = [];
  const response = await tmdb.get('/search.php', {
    params: {
      s: searchTerm,
    },
  });
  const { meals } = response.data;
  if (!meals) {
    dispatch({ type: FETCH_RECIPES_BY_NAME, payload: results });
    return;
  }
  meals.forEach((meal, index) => {
    results.push(createRecipeFromResponse(response, index));
  });
  dispatch({ type: FETCH_RECIPES_BY_NAME, payload: results });
};

/**
 * Remove the recipe with the given ID from the redux store.
 * @param {number} id - id of the recipe to be removed from the store
 */
const removeRecipe = (id) => ({
  type: REMOVE_RECIPE,
  payload: id,
});

export default {
  fetchRecipeById,
  getRandomRecipes,
  fetchRecipesByName,
  removeRecipe,
};
