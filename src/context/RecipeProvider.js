import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import { getMeals, getDetailedMeals } from '../services/mealsAPI';

export default function RecipeProvider({ children }) {
  const [id, setId] = useState(null);
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    getMeals('a', 'Italian', 'filter')
      .then((response) => setId(response.meals[0].idMeal));
    if (id !== null) {
      getDetailedMeals(id)
        .then((response) => setFullDetails((response.meals)[0]));
    }
  }, [id]);

  const values = useMemo(() => ({
    fullDetails,
  }), [
    fullDetails,
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
