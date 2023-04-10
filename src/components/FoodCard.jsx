function FoodCard(doneRecipe) {
  return (
    (doneRecipe.map((recipe, index) => (
      <div key={ index }>
        <img
          src={ recipe.image }
          alt="recipe"
          data-testid={ `${index}-horizontal-image` }
        />
        <h2 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h2>
        <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
        <p data-testid={ `${index}-${tagName}-horizontal-tag` }>{ recipe.tags }</p>
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.shareBtn }</p>
      </div>
    )))
  );
}

export default FoodCard;
