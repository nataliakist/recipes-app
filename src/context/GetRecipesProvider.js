import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import GetRecipesContext from './GetRecipesContext';

export default function GetRecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [getRecipes, setGetRecipes] = useState([]);

  const filterMeals = useCallback(() => {
    const filteredMeals = getRecipes.filter((recipe) => recipe.type === 'meal');
    setRecipes(filteredMeals);
  }, [getRecipes]);

  const filterDrinks = useCallback(() => {
    const filteredDrinks = getRecipes.filter((recipe) => recipe.type === 'drink');
    setRecipes(filteredDrinks);
  }, [getRecipes]);

  const allRecipes = useCallback(() => {
    setRecipes(getRecipes);
  }, [getRecipes]);

  const values = useMemo(() => ({
    filterMeals,
    filterDrinks,
    allRecipes,
    recipes,
    setRecipes,
    getRecipes,
    setGetRecipes,
  }), [allRecipes, filterDrinks, filterMeals, recipes, getRecipes]);

  return (
    <GetRecipesContext.Provider value={ values }>
      { children }
    </GetRecipesContext.Provider>
  );
}

GetRecipesProvider.propTypes = {
  LSItem: propTypes.string,
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}.isRequired;
