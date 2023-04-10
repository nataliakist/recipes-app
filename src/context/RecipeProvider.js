import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipeContext from './RecipeContext';
import { getDetailedMeals, getRecomendedMeals } from '../services/mealsAPI';
import { getRecomendedDrinks, getDetailedDrink } from '../services/drinksAPI';

export default function RecipeProvider({ children }) {
  const [id, setId] = useState(null);
  const [fullDetails, setFullDetails] = useState(null);
  const [recommended, setRecommended] = useState(null);

  const { pathname } = useLocation();

  useEffect(() => {
    if (id !== null) {
      if (pathname.includes('meals')) {
        getDetailedMeals(id)
          .then((response) => setFullDetails((response.meals)[0]));
        getRecomendedDrinks()
          .then((response) => setRecommended(response.drinks));
      } else if (pathname.includes('drinks')) {
        getDetailedDrink(id)
          .then((response) => setFullDetails((response.drinks)[0]));
        getRecomendedMeals()
          .then((response) => setRecommended(response.meals));
      }
    }
  }, [id]);

  const values = useMemo(() => ({
    fullDetails,
    recommended,
    setId,
  }), [
    fullDetails,
    recommended,
  ]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
