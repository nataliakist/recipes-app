import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import RecipesCard from './RecipesCard';
import { getMeals } from '../services/mealsAPI';
import { getDrinks } from '../services/drinksAPI';

function Recipes() {
  const twelve = 12;
  const history = useHistory();
  const { pathname } = history.location;

  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <div>
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
    </div>
  );
}

Recipes.propTypes = {
  pathname: propTypes.string,
}.isRequired;

export default Recipes;
