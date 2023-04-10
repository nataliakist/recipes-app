import Header from '../components/Header';
import Button from '../components/Button';
import FoodCard from '../components/FoodCard';

function DoneRecipes() {
  return (
    <main>
      <Header title="Done Recipes" />

      <form>
        <Button
          data-testid="filter-by-all-btn"
          label="All"
        />

        <Button
          data-testid="filter-by-meal-btn"
          label="Meals"
        />

        <Button
          data-testid="filter-by-drink-btn"
          label="Drinks"
        />

        <FoodCard />
      </form>
    </main>
  );
}

export default DoneRecipes;
