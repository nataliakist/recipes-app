import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton() {
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
        src={ shareIcon }
      >
        <img
          src={ shareIcon }
          alt="share"
          data-testid="share-btn"
        />
      </button>
      { isCopied && <p> Link copied! </p>}
    </>
  );
}

export default ShareButton;
