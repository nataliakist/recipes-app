import { useContext } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import DoneRecipesContext from '../context/DoneRecipesContext';

function DoneRecipesCard() {
  const { doneRecipe } = useContext(DoneRecipesContext);
  return (
    <main>

      { doneRecipe.length > 0 && doneRecipe.map((recipe, index) => (
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
          {recipe.tags.length > 0 && recipe.tags.slice(0, 2).map((tagName, tagIndex) => (
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
