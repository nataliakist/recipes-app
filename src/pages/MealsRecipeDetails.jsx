import { useState, useEffect } from 'react';
import Button from '../components/Button';
import DetailedMealsRecipeCard from '../components/DetailedMealsCard';
import '../carouselStyles.css';
import Header from '../components/Header';
import { getRecomendedDrinks } from '../services/drinksAPI';

function MealsDetailedRecipes() {
  const [isFinished] = useState(false);
  const [isStarted] = useState(true);
  const [drinksArr, setDrinksArr] = useState(null);

  const recommendedAmount = 6;

  useEffect(() => {
    getRecomendedDrinks()
      .then((response) => setDrinksArr(response.drinks));
  }, []);

  const sixRecommendations = [];

  if (drinksArr !== null) {
    for (let i = 0; i < recommendedAmount; i += 1) {
      sixRecommendations.push(
        {
          thumb: drinksArr[i].strDrinkThumb,
          title: drinksArr[i].strDrink,
        },
      );
    }
  }

  return (
    <>
      <Header title="Detailed Recipes" />
      <DetailedMealsRecipeCard />
      <div className="cards-container">
        { drinksArr !== null && sixRecommendations.map((value, index) => (
          <div className="cards-wrapper" key={ index }>
            <img
              src={ value.thumb }
              alt={ value.title }
              width="180"
              height="150"
            />
            <h3>
              { value.title }
            </h3>
          </div>
        ))}
      </div>
      { (!isFinished)
        && (isStarted ? (
          <Button label="Continue Recipe" />
        ) : (
          <Button label="Start Recipe" />
        )) }
    </>
  );
}

export default MealsDetailedRecipes;
