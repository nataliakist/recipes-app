import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import Button from './Button';

function DetailedMealsRecipeCard() {
  const { fullDetails } = useContext(RecipeContext);

  if (fullDetails !== null) {
    const fullArr = Object.entries(fullDetails);
    const ingredientArr = [];
    const measureArr = [];
    fullArr.forEach((value) => {
      if (value[0].includes('strIngredient')) {
        ingredientArr.push(value[1]);
      }
      if (value[0].includes('strMeasure')) {
        measureArr.push(value[1]);
      }
    });
    return (
      <>
        <Button
          type="button"
          label="Share"
          dataTestId="share-btn"
        />
        <Button
          type="button"
          label="Favorite"
          dataTestId="favorite-btn"
        />
        <img
          src={ fullDetails.strMealThumb }
          alt={ fullDetails.strMeal }
          data-testid="recipe-photo"
          width="360"
          height="300"
        />
        <h1 data-testid="recipe-title">
          { fullDetails.strMeal }
        </h1>
        <h2 data-testid="recipe-category">
          { fullDetails.strCategory }
        </h2>
        <div>
          { ingredientArr.map((value, index) => (
            (value !== '' && value !== null) && (
              <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                { value }
                { ' - '}
                { measureArr[index] }
              </p>
            )
          ))}
        </div>
        <p data-testid="instructions">
          { fullDetails.strInstructions }
        </p>
        <h1> Video </h1>
        <video width="360" height="300" controls>
          <source src={ fullDetails.strYoutube } />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      </>
    );
  }
}

export default DetailedMealsRecipeCard;
