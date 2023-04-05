import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import RecipesCard from './RecipesCard';
import { getMeals } from '../services/mealsAPI';
import { getDrinks } from '../services/drinksAPI';

function Recipes() {
  const five = 5;
  const twelve = 12;
  const history = useHistory();
  const { pathname } = history.location;

  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    switch (pathname) {
    case '/meals':
      getMeals('s', '', 'search', 'meals')
        .then((response) => response
          .slice(0, twelve))
        .then(setRecipes);
      getMeals('c', 'list', 'list', 'meals')
        .then((response) => response
          .slice(0, five))
        .then(setCategories);
      break;
    case '/drinks':
      getDrinks('s', '', 'search', 'drinks')
        .then((response) => response
          .slice(0, twelve))
        .then(setRecipes);
      getDrinks('c', 'list', 'list', 'drinks')
        .then((response) => response
          .slice(0, five))
        .then(setCategories);
      break;
    default:
      break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = (category) => {
    if (category) {
      switch (pathname) {
      case '/meals':
        getMeals('c', category, 'filter', 'meals')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        break;
      case '/drinks':
        getDrinks('c', category, 'filter', 'drinks')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        break;
      default:
        break;
      }
    } else {
      switch (pathname) {
      case '/meals':
        getMeals('s', '', 'search', 'meals')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        break;
      case '/drinks':
        getDrinks('s', '', 'search', 'drinks')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        break;
      default:
        break;
      }
    }
  };

  return (
    <div>
      <header>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClick() }
        >
          All
        </button>
        {
          categories.map((category, index) => (
            <button
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ () => handleClick(category.strCategory) }
            >
              { category.strCategory }
            </button>
          ))
        }
      </header>
      <main>
        {
          recipes.map((recipe, index) => (
            <RecipesCard
              key={ index }
              index={ index }
              name={ recipe[pathname === '/meals' ? 'strMeal' : 'strDrink'] }
              image={ recipe[pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb'] }
            />
          ))
        }
      </main>
    </div>
  );
}

Recipes.propTypes = {
  pathname: propTypes.string,
}.isRequired;

export default Recipes;
