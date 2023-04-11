import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard() {
  const getRecipes = localStorage.getItem('doneRecipes')
    ? (JSON.parse(localStorage.getItem('doneRecipes'))) : [];
  const [doneRecipe, setDoneRecipe] = useState(getRecipes);
  console.log(setDoneRecipe);

  return (
    <main>

      { doneRecipe.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />

          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>

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

          {recipe.tags.slice(0, 2).map((tagName, tagIndex) => (
            <p
              key={ tagIndex }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </p>
          ))}
          <button type="button">
            <img
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </div>
      ))}

    </main>
  );
}

export default DoneRecipesCard;
