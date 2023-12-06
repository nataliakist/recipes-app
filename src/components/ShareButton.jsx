import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ testid }) {
  const [isCopied, setIsCopied] = useState(false);
  const { pathname } = useLocation();

  const copyBtn = () => {
    copy(`http://localhost:3000${pathname}`);
    setIsCopied(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={ copyBtn }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid={ testid }
        />
      </button>
      { isCopied && <p> Link copied! </p>}
    </>
  );
}

export default ShareButton;

ShareButton.propTypes = {
  testid: PropTypes.string,
}.isRequired;
