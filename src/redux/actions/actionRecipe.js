/* eslint-disable no-await-in-loop */
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
  if (!response.data.meals) {
    return {};
  }
  const data = response.data.meals[index];
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
const fetchRecipeById = (recipeId) => async (dispatch, getState) => {
  // if the recipe has already been fetched, use the previously fetched object
  if (getState().recipes.fetchedRecipes.find((r) => r.id === recipeId)) {
    dispatch({
      type: FETCH_RECIPE,
      payload: getState().recipes.fetchedRecipes.find((r) => r.id === recipeId),
    });
    return;
  }
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
  const recipe = createRecipeFromResponse(response);
  return recipe;
};

/**
 * Get a number of random recipes and store them in the redux store.
 * @param {number} count - count of the recipes that will be stored
 */
const getRandomRecipes = (count) => async (dispatch, getState) => {
  const randoms = [];
  const promises = [];
  // an object to flag already fetched recipe IDs to keep fetched IDs unique
  const uniqueIds = getState().recipes.randoms.reduce((acc, curRandom) => {
    acc[curRandom] = true;
    return acc;
  }, {});
  // make the required number of API requests,
  // and resolve them all with Promise.all()
  while (promises.length < count) {
    promises.push(tmdb.get('/random.php'));
  }
  const promiseResults = await Promise.all(promises);
  // add the resolved values to the uniqueIds object,
  // as long as the same ID hasn't already been fetched
  const uniqueResults = promiseResults.filter((res) => {
    const id = res.data.meals[0].idMeal;
    if (uniqueIds[id]) {
      return false;
    }
    uniqueIds[id] = true;
    return true;
  });
  // add the unique results to randoms array
  uniqueResults.forEach((result) => {
    randoms.push(createRecipeFromResponse(result));
  });
  // while the number of unique random values is less than the required amount,
  // fetch new random values and add them to the randoms array
  // if they are unique amongst the other values
  while (randoms.length < count) {
    const newRandom = await getRandomRecipe();
    if (!uniqueIds[newRandom.id]) {
      uniqueIds[newRandom.id] = true;
      randoms.push(newRandom);
    }
  }
  dispatch({ type: FETCH_RANDOM, payload: randoms });
};

/**
 * Remove the recipe with the given ID from the redux store.
 * @param {number} id - id of the recipe to be removed from the store
 */
const removeRecipe = (id) => ({
  type: REMOVE_RECIPE,
  payload: id,
});

/**
 * Fetch recipes from API by their name, if their name completely or
 * partially matches the search term. If the search term is empty,
 * do not fetch any recipe.
 * @param {string} searchTerm - name of the recipe that is searched
 */
const fetchRecipesByName = (searchTerm) => async (dispatch) => {
  let results = [];
  if (!searchTerm) {
    dispatch({ type: FETCH_RECIPES_BY_NAME, payload: [] });
    return;
  }
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
  results = results.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  dispatch({ type: FETCH_RECIPES_BY_NAME, payload: results });
};

export default {
  fetchRecipeById,
  getRandomRecipes,
  fetchRecipesByName,
  removeRecipe,
};
