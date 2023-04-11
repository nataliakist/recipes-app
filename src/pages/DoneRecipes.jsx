import { useContext } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import Header from '../components/Header';
import DoneRecipesContext from '../context/DoneRecipesContext';

function DoneRecipes() {
  const { filterMeals, filterDrinks, allRecipes } = useContext(DoneRecipesContext);

  return (
    <main>
      <Header title="Done Recipes" />

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

      <DoneRecipesCard />
    </main>
  );
}

export default DoneRecipes;
