import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { getDrinks } from '../services/drinksAPI';
import { getMeals } from '../services/mealsAPI';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [showBar, setShowBar] = useState(false);
  const [checkedRadioButton, setCheckedRadioButton] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const showBarFunc = useCallback(() => {
    const bool = showBar;
    setShowBar(!bool);
  }, [showBar]);
  const checkedRadioButtonFunc = ({ target }) => setCheckedRadioButton(target.value);

  const inputChange = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
    setShowAlert(false);
  };

  const searchButtonClick = useCallback(async ({ page }) => {
    const input = searchInput;
    const category = checkedRadioButton;
    switch (category) {
    case 'ingredient': {
      if (page === 'Meals') {
        const result = await getMeals('i', input, 'filter');
        setFilteredRecipes(result);
      } else {
        const result = await getDrinks('i', input, 'filter');
        setFilteredRecipes(result);
      }
      break;
    }
    case 'first-letter': {
      if (input.length > 1) {
        setShowAlert(true);
        break;
      }
      if (page === 'Meals') {
        const result = await getMeals('f', input, 'search');
        setFilteredRecipes(result);
      } else {
        const result = await getDrinks('f', input, 'search');
        setFilteredRecipes(result);
      }
      break;
    }
    case 'name': {
      if (page === 'Meals') {
        const result = await getMeals('s', input, 'search');
        setFilteredRecipes(result);
      } else {
        const result = await getDrinks('s', input, 'search');
        setFilteredRecipes(result);
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
    showAlert,
    searchButtonClick,
    filteredRecipes,
  }), [
    showAlert,
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
