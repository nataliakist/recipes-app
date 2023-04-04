import { number, string } from 'prop-types';

function RecipesCard({ index, name, image }) {
  return (
    <div key={ `${name}` } data-testid={ `${index}-recipe-card` }>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-card-img` }
        style={ { width: '100px' } }
      />
      <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
    </div>
  );
}

RecipesCard.propTypes = {
  index: number,
  name: string,
  thumb: string,
}.isRequired;

export default RecipesCard;
