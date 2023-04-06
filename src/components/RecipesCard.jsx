import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipesCard({ index, name, image, URL }) {
  return (
    <Link to={ URL }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
          style={ { width: '100px' } }
        />
        <h3 data-testid={ `${index}-card-name` }>{ name }</h3>
      </div>
    </Link>
  );
}

RecipesCard.propTypes = {
  index: propTypes.number,
  name: propTypes.string,
  thumb: propTypes.string,
}.isRequired;

export default RecipesCard;
