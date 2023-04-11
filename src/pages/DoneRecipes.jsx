// import { useEffect } from 'react';
import Header from '../components/Header';
import FoodCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  // useEffect(() => {
  //   const doneRecipes = [{
  //     id: '52999',
  //     type: 'meals',
  //     nationality: 'Irish',
  //     category: 'Pork',
  //     alcoholicOrNot: '',
  //     name: 'Crispy Sausages and Greens',
  //     image: 'https://www.themealdb.com/images/media/meals/st1ifa1583267248.jpg',
  //     doneDate: new Date(),
  //     tags: 'Breakfast, lunch, dinner',
  //   },
  //   {
  //     id: '17245',
  //     type: 'drinks',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Rosemary Blue',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/qwc5f91512406543.jpg',
  //     doneDate: new Date(),
  //     tags: '',
  //   },
  //   {
  //     id: '12690',
  //     type: 'drinks',
  //     nationality: '',
  //     category: 'Other / Unknown',
  //     alcoholicOrNot: 'Non Alcoholic',
  //     name: 'Lassi - A South Indian Drink',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/iq6scx1487603980.jpg',
  //     doneDate: new Date(),
  //     tags: '',
  //   },
  //   ];

  //   localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  // }, []);

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
