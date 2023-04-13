import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import Button from './Button';
import '../carouselStyles.css';

function DetailedRecipeCard() {
  const { fullDetails, recommended } = useContext(RecipeContext);
  const [isFinished, setFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const { id } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const recommendedAmount = 6;
  const recommendations = [];

  const doneVerify = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== null) {
      doneRecipes.forEach((value) => {
        if ((value.id).includes(id)) {
          setFinished(true);
        }
      });
    }
  };

  const progressVerify = () => {
    if (localStorage.getItem('inProgressRecipes') !== null) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const { meals } = inProgressRecipes;
      const { drinks } = inProgressRecipes;
      if (meals) {
        Object.keys(meals).forEach((value) => {
          if (value.includes(id)) setIsStarted(true);
        });
      }
      if (drinks) {
        Object.keys(drinks).forEach((value) => {
          if (value.includes(id)) setIsStarted(true);
        });
      }
    }
  };

  useEffect(() => { progressVerify(); doneVerify(); }, []);

  if (recommended !== null) {
    for (let i = 0; i < recommendedAmount; i += 1) {
      recommendations.push(
        {
          thumb: recommended[i].strDrinkThumb || recommended[i].strMealThumb,
          title: recommended[i].strDrink || recommended[i].strMeal,
        },
      );
    }
  }

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
          src={ fullDetails.strMealThumb || fullDetails.strDrinkThumb }
          alt={ fullDetails.strMeal || fullDetails.strDrink }
          data-testid="recipe-photo"
          width="360"
          height="300"
        />
        <h1 data-testid="recipe-title">
          { fullDetails.strMeal || fullDetails.strDrink }
        </h1>
        <h2 data-testid="recipe-category">
          { fullDetails.strCategory }
        </h2>
        <h3 data-testid="recipe-category">
          { fullDetails.strAlcoholic || null}
        </h3>
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
        <video width="360" height="300" controls data-testid="video">
          <source src={ fullDetails.strYoutube } />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
        <div className="cards-container">
          { recommended !== null && recommendations.map((value, index) => (
            <div
              className="cards-wrapper"
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ value.thumb }
                alt={ value.title }
                width="185"
                height="150"
              />
              <h3
                data-testid={ `${index}-recommendation-title` }
              >
                { value.title }
              </h3>
            </div>
          ))}
        </div>
        { (!isFinished)
        && (isStarted ? (
          <Button
            label="Continue Recipe"
            moreClasses="start-recipe"
            dataTestId="start-recipe-btn"
            onClick={ () => history.push(`${pathname}/in-progress`) }
          />
        ) : (
          <Button
            label="Start Recipe"
            moreClasses="start-recipe"
            dataTestId="start-recipe-btn"
            onClick={ () => history.push(`${pathname}/in-progress`) }
          />
        )) }
      </>
    );
  }
}

DetailedRecipeCard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default DetailedRecipeCard;
