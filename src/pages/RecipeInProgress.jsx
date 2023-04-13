import React, { useState, useEffect } from 'react';
import { useHistory, useParams /* useLocation */ } from 'react-router-dom';
import { getDetailedMeals } from '../services/mealsAPI';
// import PropTypes from 'prop-types';
import { getDetailedDrink } from '../services/drinksAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const history = useHistory();
  const idAndType = useParams();
  const [isDisabled, setIsDisabled] = useState(true);
  const [checks, setChecks] = useState([]);
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [fullDetails, setFullDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState('');
  const [src, setSrc] = useState('');
  const [alcoholic, setAlcoholic] = useState(null);
  const [measures, setMeasures] = useState([]);
  const [category, setCategory] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    console.log(idAndType);
    const idOf = Object.values(idAndType);
    console.log(idOf[0]);
    const isType = Object.keys(idAndType);
    setId(idOf[0]);
    console.log(isType);
    if (isType[0] === 'drinksId') {
      getDetailedDrink(idOf[0])
        .then((response) => setFullDetails((response.drinks)[0]));
    } else if (isType[0] === 'mealsId') {
      getDetailedMeals(idOf[0])
        .then((response) => setFullDetails((response.meals)[0]));
    }
  }, [idAndType]);

  useEffect(() => {
    const typeOf = fullDetails.idDrink ? 'drinks' : 'meals';
    setType(typeOf);
    const href = fullDetails.strMealThumb || fullDetails.strDrinkThumb;
    const titleOf = fullDetails.strMeal || fullDetails.strDrink;
    const alcoholicOf = fullDetails.strAlcoholic || null;
    const categoryOf = fullDetails.strCategory || '';
    setCategory(categoryOf);
    setAlcoholic(alcoholicOf);
    setTitle(titleOf);
    setSrc(href);
    const previousFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
    || [];
    if (previousFavorites.some((fav) => fav.id === id)) { setIsFav(true); }
    const previousDoneRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {};
    // const pDNAR = Object.value();
    const checksOf = previousDoneRecipes[type] ? Object
      .keys(previousDoneRecipes[type]) : [];
    console.log(checksOf);
    if (checksOf.includes(id)) setChecks(previousDoneRecipes[type][id]);
    const measuresAr = [];
    const ingredientsAr = [];
    const twenty = 20;
    for (let i = 1; i <= twenty; i += 1) {
      if (fullDetails[`strIngredient${i}`]) {
        ingredientsAr.push(fullDetails[`strIngredient${i}`]);
        measuresAr.push(fullDetails[`strMeasure${i}`]);
      }
    }
    setMeasures(measuresAr);
    setIngredients(ingredientsAr);
  }, [fullDetails, type, id]);

  const doneRecipesDealer = (ingredientsDone) => {
    const typo = type === 'drinks' ? 'drink' : 'meal';
    const previousDidRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    let newDoneRecipes = [];
    const tags = fullDetails.strTags ? (fullDetails.strTags).split(',') : [];
    const newDoneRecipe = {
      id,
      type: typo,
      nationality: fullDetails.strArea || '',
      category: fullDetails.strCategory || '',
      alcoholicOrNot: alcoholic || '',
      name: title,
      image: src,
      doneDate: new Date(),
      tags,
    };
    if (ingredientsDone.length === ingredients.length) {
      newDoneRecipes = [...previousDidRecipes, newDoneRecipe];
    } else {
      newDoneRecipes = previousDidRecipes.filter((recipe) => recipe.id !== id);
    }
    console.log(newDoneRecipes);
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  };

  const checkDealer = (target) => {
    const { value } = target;
    const ingredientsDone = !checks.includes(value) ? [...checks, value] : checks
      .filter((check) => check !== value);
    const previousChecks = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
    const prevCAr = previousChecks ? Object.values(previousChecks) : [];
    let newChecks = {};
    if (prevCAr.length > 0) {
      // if (ingredientsDone.length === ingredients.length || ingredientsDone.length === 0) {
      //   delete previousChecks[type][id];
      //   newChecks = { ...previousChecks,
      //     [type]: { ...previousChecks[type], [id]: ingredientsDone } };
      // } else if (ingredientsDone
      //   .length !== ingredients.length && ingredientsDone.length > 0) {
      newChecks = { ...previousChecks,
        [type]: { ...previousChecks[type], [id]: ingredientsDone } };
      // }
    } else {
      newChecks = { [type]: { [id]: ingredientsDone } };
    }
    setChecks(ingredientsDone);
    localStorage.setItem('inProgressRecipes', JSON
      .stringify(newChecks));
    if (ingredientsDone.length === ingredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    doneRecipesDealer(ingredientsDone);
  };

  const copyBtn = () => {
    let address = '';
    if (type === 'meals') {
      address = `http://localhost:3000/meals/${id}`;
    } else {
      address = `http://localhost:3000/drinks/${id}`;
    }
    setIsCopied(true);
    copy(address);
  };

  const favoriteManager = () => {
    const ancientFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    let newFavs = [];
    const typo = type === 'drinks' ? 'drink' : 'meal';
    if (ancientFavorite.length > 0) {
      if (ancientFavorite.some((favs) => favs.id === id)) {
        setIsFav(false);
        newFavs = ancientFavorite.filter((favs) => favs.id !== id);
      } else {
        setIsFav(true);
        newFavs = [...ancientFavorite, {
          id,
          type: typo,
          nationality: fullDetails.strArea || '',
          category: fullDetails.strCategory || '',
          alcoholicOrNot: alcoholic,
          name: title,
          image: src,
        }];
      }
    } else {
      setIsFav(true);
      newFavs = [{
        id,
        type: typo,
        nationality: fullDetails.strArea || '',
        category: fullDetails.strCategory || '',
        alcoholicOrNot: alcoholic || '',
        name: title,
        image: src,
      }];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
  };
  //   const isRecipeDone = () => {};

  return (
    <>
      <div>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteManager }
          src={ !isFav ? whiteHeartIcon : blackHeartIcon }
        >
          <img alt="favorite icon" src={ !isFav ? whiteHeartIcon : blackHeartIcon } />
        </button>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyBtn }
        >
          Share
        </button>
        { isCopied && <p>Link copied!</p> }
      </div>
      <img
        width="300px"
        data-testid="recipe-photo"
        alt="recipe"
        src={ src }
      />
      <h1 data-testid="recipe-title">{ title }</h1>
      <h2 data-testid="recipe-category">{ category }</h2>
      <h3>{ alcoholic && `alcohol: ${alcoholic}`}</h3>
      <div data-testid="instructions">
        <h3>Instructions</h3>
        <ul>
          {
            ingredients.map((ing, i) => (
              <li
                style={ checks.includes(ing)
                  ? { textDecoration: 'line-through solid rgb(0, 0, 0)' } : {} }
                data-testid={ `${i}-ingredient-step` }
                key={ i }
              >
                <input
                  name={ `check${i}` }
                  value={ ing }
                  checked={ checks.some((check) => check === ing) }
                  type="checkbox"
                  onChange={ ({ target }) => {
                    checkDealer(target);
                    // isRecipeDone();
                  } }
                />
                {`${ing}`}
                { measures[i] && ` - ${measures[i]}`}
              </li>
            ))
          }
        </ul>
        <p>{fullDetails.strInstructions}</p>
      </div>
      <button
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ () => history.push('/done-recipes') }
      >
        finish
      </button>
    </>
  );
}

export default RecipeInProgress;
