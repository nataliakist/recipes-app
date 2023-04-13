import { useContext } from 'react';

import GetRecipesContext from '../context/GetRecipesContext';

function Filters() {
  const { filterMeals, filterDrinks, allRecipes } = useContext(GetRecipesContext);
  return (
    <form>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ allRecipes }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>
    </form>
  );
}

export default Filters;
