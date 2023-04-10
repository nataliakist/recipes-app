import Header from '../components/Header';
import FoodCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  return (
    <main>
      <Header title="Done Recipes" />

      <form>
        <button
          data-testid="filter-by-all-btn"
        >
          All
        </button>

        <button
          data-testid="filter-by-meal-btn"
        >
          Meal
        </button>

        <button
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>

        <FoodCard />
      </form>
    </main>
  );
}

export default DoneRecipes;
