// test recipeReducer and some actions related to it
// to check if they work properly
import moxios from 'moxios';
import recipeActions from '../actions/actionRecipe';
import { FETCH_RANDOM } from '../actions/types';
import recipeReducer from '../reducers/recipeReducer';
import tmdb from '../../api/tmdb';

const { getRandomRecipe, getRandomRecipes } = recipeActions;

const findSame = (arr) => {
  const prevItems = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (prevItems.includes(arr[i])) {
      return true;
    }
    prevItems.push(arr[i]);
  }
  return false;
};

describe('fetches a random recipe', () => {
  beforeEach(() => {
    moxios.install(tmdb);
    const rng = Math.floor(Math.random() * 4); // return a random number between 0 and 4
    const meals = [
      {
        idMeal: '0',
        strMeal: 'baklava',
        strCategory: 'dessert',
      },
      {
        idMeal: '1',
        strMeal: 'guvec',
        strCategory: 'main',
      },
      {
        idMeal: '2',
        strMeal: 'pide',
        strCategory: 'main',
      },
      {
        idMeal: '3',
        strMeal: 'corba',
        strCategory: 'soup',
      },
    ];
    moxios.stubRequest('https://www.themealdb.com/api/json/v1/1/random.php', {
      status: 200,
      response: {
        meals: meals[rng],
      },
    });
  });

  afterEach(() => {
    moxios.uninstall(tmdb);
  });

  test('can fetch a random recipe', () => {
    const recipe = getRandomRecipe();
    moxios.wait(() => {
      expect(recipe.strMeal).toEqual('baklava');
    });
  });

  test('can fetch multiple unique random recipes', () => {
    const recipes = getRandomRecipes(3);
    moxios.wait(() => {
      expect(recipes.length).toEqual(3);
      expect(findSame(recipes)).toEqual(false);
    });
  });

  test('handles fetching random recipe actions', () => {
    const action = {
      payload: [
        {
          idMeal: '1',
          strMeal: 'guvec',
          strCategory: 'main',
        },
        {
          idMeal: '2',
          strMeal: 'pide',
          strCategory: 'main',
        },
        {
          idMeal: '3',
          strMeal: 'corba',
          strCategory: 'soup',
        },
      ],
      type: FETCH_RANDOM,
    };
    const newState = recipeReducer(
      {
        currentRecipe: {},
        searchResults: [],
        randoms: [],
        fetchedRecipes: [
          {
            idMeal: '1',
            strMeal: 'guvec',
            strCategory: 'main',
          },
        ],
      },
      action,
    );
    expect(newState).toEqual({
      currentRecipe: {},
      searchResults: [],
      randoms: [
        {
          idMeal: '1',
          strMeal: 'guvec',
          strCategory: 'main',
        },
        {
          idMeal: '2',
          strMeal: 'pide',
          strCategory: 'main',
        },
        {
          idMeal: '3',
          strMeal: 'corba',
          strCategory: 'soup',
        },
      ],
      fetchedRecipes: [
        {
          idMeal: '1',
          strMeal: 'guvec',
          strCategory: 'main',
        },
        {
          idMeal: '1',
          strMeal: 'guvec',
          strCategory: 'main',
        },
        {
          idMeal: '2',
          strMeal: 'pide',
          strCategory: 'main',
        },
        {
          idMeal: '3',
          strMeal: 'corba',
          strCategory: 'soup',
        },
      ],
    });
  });
});
