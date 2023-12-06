import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import GetRecipesContext from '../context/GetRecipesContext';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function GetRecipesCard({ LSItem }) {
  const {
    recipes, setRecipes, setGetRecipes,
  } = useContext(GetRecipesContext);

  useEffect(() => {
    switch (LSItem) {
    case 'doneRecipes':
      if (!localStorage.getItem('doneRecipes')) {
        return localStorage.setItem('doneRecipes', JSON.stringify(recipes));
      }
      break;
    case 'favoriteRecipes':
      if (!localStorage.getItem('favoriteRecipes')) {
        return localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
      }
      break;
    default:
      break;
    }
    const newGetRecipes = LSItem === 'doneRecipes'
      ? JSON.parse(localStorage.getItem('doneRecipes'))
      : JSON.parse(localStorage.getItem('favoriteRecipes'));

    setGetRecipes(newGetRecipes);
    setRecipes(newGetRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (recipes.length > 0) {
    return (
      <main>

        { recipes?.map((recipe, index) => (
          <div key={ index }>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width="100px"
              />

              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            {
              recipe.type === 'meal' ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
              )
                : (
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot}
                  </p>
                )
            }

            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            {recipe.tags?.slice(0, 2).map((tagName, tagIndex) => (
              <p
                key={ tagIndex }
                data-testid={ `${index}-${tagName}-horizontal-tag` }
              >
                {tagName}
              </p>
            ))}
            <ShareButton testid={ `${index}-horizontal-share-btn` } />
            <FavoriteButton testid={ `${index}-horizontal-favorite-btn` } />
          </div>
        ))}

      </main>
    );
  }
}

export default GetRecipesCard;

GetRecipesCard.propTypes = {
  LSItem: PropTypes.string,
}.isRequired;
