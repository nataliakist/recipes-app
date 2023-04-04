import React from 'react';
import { useHistory } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <div id="divFooter">
        <button
          type="button"
          data-testid="meals-bottom-btn"
          onClick={ () => history.push('/meals') }
        >
          <img
            src={ mealIcon }
            alt="Logo de uma taça"
          />

        </button>
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          onClick={ () => history.push('/drinks') }
        >
          <img
            src={ drinkIcon }
            alt="Logo de um colher e faca"
          />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
