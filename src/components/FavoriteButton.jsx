import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ testid }) {
  const [isFavorite, setIsFavorite] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { fullDetails, id } = useContext(RecipeContext);
  const { pathname } = useLocation();

  const setFavorite = () => {
    if (isFavorite) {
      const newArr = favoriteRecipes.filter((value) => value.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
      setIsFavorite(false);
    } else if (fullDetails && !isFavorite) {
      const type = pathname.includes('drinks') ? 'drink' : 'meal';
      const newArr = [{
        id,
        type,
        nationality: fullDetails.strArea || '',
        category: fullDetails.strCategory || '',
        alcoholicOrNot: fullDetails.strAlcoholic || '',
        name: fullDetails.strMeal || fullDetails.strDrink,
        image: fullDetails.strMealThumb || fullDetails.strDrinkThumb,
      }];
      favoriteRecipes.forEach((value) => newArr.push(value));
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    setIsFavorite(favoriteRecipes.some((value) => (value.id).includes(id)));
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavorite, id]);

  return (
    <button
      type="button"
      onClick={ () => { setFavorite(); } }
    >
      <img
        alt="favorite icon"
        src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
        data-testid={ testid }
      />
    </button>
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  testid: PropTypes.string,
}.isRequired;
