import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard() {
  const [doneRecipe, setDoneRecipe] = useState([]);
  useEffect(() => {
    setDoneRecipe(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const splitTags = (tags) => {
    const arrayWithTags = tags.split(',');
    const firstTwoTags = arrayWithTags.slice(0, 2);
    return firstTwoTags;
  };

  return (
    <main>
      { doneRecipe ? doneRecipe.map((recipe, index) => (recipe.type === 'meals'
        ? (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
            />

            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.category}
              {' - '}
              {recipe.nationality}
            </p>

            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>

            <p
              data-testid={ `${index}-${splitTags(recipe.tags)}-horizontal-tag` }
            >
              { splitTags(recipe.tags) }
            </p>

            <button data-testid={ `${index}-horizontal-share-btn` } src>
              <img
                src={ shareIcon }
                alt="share"
              />
            </button>
          </div>
        )
        : (
          <div key={ index }>

            <img
              src={ recipe.image }
              alt="recipe"
              data-testid={ `${index}-horizontal-image` }
            />

            <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.alcoholicOrNot }
            </p>

            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>

            <button data-testid={ `${index}-horizontal-share-btn` } src>
              <img
                src={ shareIcon }
                alt="share"
              />
            </button>
            {/* eslint-disable-next-line react/jsx-closing-tag-location */}
          </div>
        )
      )) : <h1> Finalize uma receita </h1>}
    </main>
  );
}

export default DoneRecipesCard;
