import { FETCH_RECIPE } from './types';
import tmdb from '../../api/tmdb';

const fetchRecipeById = (recipeId) => async (dispatch) => {
  const response = await tmdb.get('/lookup.php', {
    params: {
      i: recipeId,
    },
  });
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
  Object.keys(data).forEach((key) => {
    if (key.includes('Ingredient') && data[key]) {
      ingredients.push(data[key]);
    }
    if (key.includes('Measure') && data[key]) {
      measures.push(data[key]);
    }
  });

  const recipeObj = {
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
  dispatch({ type: FETCH_RECIPE, payload: recipeObj });
};

export default { fetchRecipeById };
