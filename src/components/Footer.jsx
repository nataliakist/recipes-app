import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <div id="divFooter">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
        >
          <Link to="/meals">
            <img
              id="meal"
              src={ mealIcon }
              alt="Logo de uma taça"
            />
          </Link>
        </button>
        <button
          type="button"
          data-testid="meals-bottom-btn"
        >
          <Link to="/drinks">
            <img
              src={ drinkIcon }
              alt="Logo de uma taça"
            />
          </Link>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
