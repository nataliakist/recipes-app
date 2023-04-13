import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeContext from '../context/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { id, fullDetails } = useContext(RecipeContext);
  const { pathname } = useLocation();

  const setFavorite = () => {
    if (isFavorite) {
      const newArr = favoriteRecipes.filter((value) => value.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
      setIsFavorite(false);
    } else if (!isFavorite) {
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
  }, [isFavorite, id]);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => { setFavorite(); } }
      src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
    >
      <img alt="favorite icon" src={ !isFavorite ? whiteHeartIcon : blackHeartIcon } />
    </button>
  );
}
export default FavoriteButton;
