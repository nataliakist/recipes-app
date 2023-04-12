import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect } from 'react';
import DoneRecipesContext from './DoneRecipesContext';

export default function DoneRecipesProvider({ children }) {
  const getRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [doneRecipe, setDoneRecipe] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('doneRecipes')) {
      return localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));
    }

    setDoneRecipe(getRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterMeals = useCallback(() => {
    const filteredMeals = getRecipes.filter((recipes) => recipes.type === 'meal');
    setDoneRecipe(filteredMeals);
  }, [getRecipes]);

  const filterDrinks = useCallback(() => {
    const filteredDrinks = getRecipes.filter((recipes) => recipes.type === 'drink');
    setDoneRecipe(filteredDrinks);
  }, [getRecipes]);

  const allRecipes = useCallback(() => {
    setDoneRecipe(getRecipes);
  }, [getRecipes]);

  const values = useMemo(() => ({
    filterMeals,
    filterDrinks,
    allRecipes,
    doneRecipe,
  }), [allRecipes, filterDrinks, filterMeals, doneRecipe]);

  return (
    <DoneRecipesContext.Provider value={ values }>
      { children }
    </DoneRecipesContext.Provider>
  );
}

DoneRecipesProvider.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
