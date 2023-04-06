import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { getDrinks } from '../services/drinksAPI';
import { getMeals } from '../services/mealsAPI';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [showBar, setShowBar] = useState(false);
  const [checkedRadioButton, setCheckedRadioButton] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [showAlertNoRecipes, setShowAlertNoRecipes] = useState(false);

  const showBarFunc = useCallback(() => {
    const bool = showBar;
    setShowBar(!bool);
  }, [showBar]);
  const checkedRadioButtonFunc = ({ target }) => setCheckedRadioButton(target.value);

  const inputChange = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
  };

  const emptyFilter = () => setShowAlertNoRecipes(true);

  const verifyResultMeals = (result) => {
    if (!result.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      const max = 12;
      setFilteredRecipes(result.meals.slice(0, max));
    }
  };

  const verifyResultDrinks = (result) => {
    if (!result.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      const max = 12;
      setFilteredRecipes(result.drinks.slice(0, max));
    }
  };

  const searchButtonClick = useCallback(async ({ page }) => {
    const input = searchInput;
    const category = checkedRadioButton;
    switch (category) {
    case 'ingredient': {
      if (page === 'Meals') {
        const result = await getMeals('i', input, 'filter');
        verifyResultMeals(result);
      } else {
        const result = await getDrinks('i', input, 'filter');
        verifyResultDrinks(result);
      }
      break;
    }
    case 'first-letter': {
      if (input.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      if (page === 'Meals') {
        const result = await getMeals('f', input, 'search');
        verifyResultMeals(result);
      } else {
        const result = await getDrinks('f', input, 'search');
        verifyResultDrinks(result);
      }
      break;
    }
    case 'name': {
      if (page === 'Meals') {
        const result = await getMeals('s', input, 'search');
        verifyResultMeals(result);
      } else {
        const result = await getDrinks('s', input, 'search');
        verifyResultDrinks(result);
      }
      break;
    }
    default:
      break;
    }
  }, [searchInput, checkedRadioButton]);

  const values = useMemo(() => ({
    checkedRadioButton,
    checkedRadioButtonFunc,
    showBar,
    showBarFunc,
    inputChange,
    searchInput,
    showAlertNoRecipes,
    searchButtonClick,
    filteredRecipes,
    emptyFilter,
  }), [
    showAlertNoRecipes,
    filteredRecipes,
    searchButtonClick,
    searchInput,
    showBar,
    checkedRadioButton,
    showBarFunc,
  ]);

  return (
    <HeaderContext.Provider value={ values }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
