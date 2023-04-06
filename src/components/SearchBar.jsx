import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import Input from './Input';
import Button from './Button';

export function SearchBar(page) {
  const {
    checkedRadioButton,
    checkedRadioButtonFunc,
    inputChange,
    searchInput,
    searchButtonClick,
    filteredRecipes,
    emptyFilter,
  } = useContext(HeaderContext);

  const history = useHistory();

  // Verifica se o retorno da API só tem um item, pois neste caso o usuário tem que ser direcionado à página de detalhes da receita
  const checkData = () => {
    const pg = Object.values(page);
    if (filteredRecipes.length === 1) {
      switch (pg[0]) {
      case 'Meals': {
        const id = filteredRecipes[0].idMeal;
        history.push(`/meals/${id}`);
        break;
      }
      case 'Drinks': {
        const id = filteredRecipes[0].idDrink;
        console.log(id);
        history.push(`/drinks/${id}`);
        break;
      }
      default:
        break;
      }
    }
    if (!filteredRecipes) { emptyFilter(); }
  };

  useEffect(() => {
    checkData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredRecipes]); // Warning não é erro de Lint! Pode deixar assim.

  return (
    <div>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
        } }
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
          <input
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            checked={ checkedRadioButton === 'ingredient' }
            onChange={ checkedRadioButtonFunc }
          />
          Ingredient
        </label>
        <p />
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            value="name"
            id="name-search-radio"
            data-testid="name-search-radio"
            checked={ checkedRadioButton === 'name' }
            onChange={ checkedRadioButtonFunc }
          />
          Name
        </label>
        <p />
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            value="first-letter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            checked={ checkedRadioButton === 'first-letter' }
            onChange={ checkedRadioButtonFunc }
          />
          First Letter
        </label>
        <p />
        <Button
          label="Search"
          moreClasses=""
          type="button"
          onClick={ () => {
            searchButtonClick(page);
          } }
          //   disabled=""
          dataTestId="exec-search-btn"
        />
        <p />
      </form>
    </div>
  );
}
