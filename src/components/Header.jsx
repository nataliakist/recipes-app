import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { SearchBar } from './SearchBar';

function Header({ pathname, title }) {
  const shouldDisplayIcon = pathname === '/meals' || pathname === '/drinks';
  const {
    showBar,
    showBarFunc,
  } = useContext(HeaderContext);
  return (
    <div>
      <img
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
      />
      <h1 data-testid="page-title">
        { title }
      </h1>
      { shouldDisplayIcon && (
        <button onClick={ showBarFunc }>
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      )}
      { showBar && (<SearchBar />) }
    </div>
  );
}

export default Header;

Header.propTypes = {
  history: PropTypes.object,
}.isRequired;
