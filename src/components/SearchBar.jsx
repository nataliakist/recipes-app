import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';
import Input from './Input';
import Button from './Button';

export function SearchBar() {
  const {
    checkedRadioButton,
    checkedRadioButtonFunc,
    inputChange,
    searchInput,
  } = useContext(HeaderContext);
  return (
    <div>
      <form
        onSubmit={ (e) => e.preventDefault }
      >
        <label htmlFor="search-input">
          <Input
            dataTestId="search-input"
            type="text"
            name="search-input"
            value={ searchInput }
            onChange={ inputChange }
            placeholder="Search"
            label="Search"
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          Ingredient
          <input
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            checked={ checkedRadioButton === 'ingredient' }
            onChange={ checkedRadioButtonFunc }
          />
        </label>
        <label htmlFor="name-search-radio">
          Name
          <input
            type="radio"
            value="name"
            id="name-search-radio"
            data-testid="name-search-radio"
            checked={ checkedRadioButton === 'name' }
            onChange={ checkedRadioButtonFunc }

          />
        </label>
        <label htmlFor="first-letter-search-radio">
          First Letter
          <input
            type="radio"
            value="first-letter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            checked={ checkedRadioButton === 'first-letter' }
            onChange={ checkedRadioButtonFunc }

          />
        </label>
        <Button
          label="Search"
          moreClasses=""
          type="submit"
          //   onClick=""
          //   disabled=""
          dataTestId="exec-search-btn"
        />
      </form>
    </div>
  );
}
