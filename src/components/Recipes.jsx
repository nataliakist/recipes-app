import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import HeaderContext from '../context/HeaderContext';

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
  const [category, setCategory] = useState(null);

  const { filteredRecipes } = useContext(HeaderContext);

  useEffect(() => {
    if (filteredRecipes.length > 1) {
      console.log('aqui');
      setRecipes(filteredRecipes);
    } else if (pathname === '/meals') {
      getMeals('s', '', 'search', 'meals')
        .then((response) => response
          .slice(0, twelve))
        .then(setRecipes);
      getMeals('c', 'list', 'list', 'meals')
        .then((response) => response
          .slice(0, five))
        .then(setCategories);
    } else if (pathname === '/drinks') {
      getDrinks('s', '', 'search', 'drinks')
        .then((response) => response
          .slice(0, twelve))
        .then(setRecipes);
      getDrinks('c', 'list', 'list', 'drinks')
        .then((response) => response
          .slice(0, five))
        .then(setCategories);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, filteredRecipes]);

  const handleClick = ({ target }) => {
    if (target.textContent !== 'All' && target.textContent !== category) {
      if (pathname === '/meals') {
        getMeals('c', target.textContent, 'filter', 'meals')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        setCategory(target.textContent);
      } else if (pathname === '/drinks') {
        getDrinks('c', target.textContent, 'filter', 'drinks')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        setCategory(target.textContent);
      }
    } else {
      switch (pathname) {
      case '/meals':
        getMeals('s', '', 'search', 'meals')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        setCategory('');
        break;
      case '/drinks':
        getDrinks('s', '', 'search', 'drinks')
          .then((response) => response
            .slice(0, twelve))
          .then(setRecipes);
        setCategory('');
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
          onClick={ (e) => handleClick(e) }
        >
          All
        </button>
        {
          categories.map((category1, index) => (
            <button
              key={ index }
              data-testid={ `${category1.strCategory}-category-filter` }
              onClick={ (e) => handleClick(e) }
            >
              { category1.strCategory }
            </button>
          ))
        }
      </header>
      <main>
        {
          recipes.map((recipe, index) => (
            <RecipesCard
              key={ `${pathname}-${index}` }
              index={ index }
              name={ recipe[pathname === '/meals' ? 'strMeal' : 'strDrink'] }
              image={ recipe[pathname === '/meals' ? 'strMealThumb' : 'strDrinkThumb'] }
              URL={ `${pathname}/${recipe[pathname === '/meals'
                ? 'idMeal' : 'idDrink']}` }
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
