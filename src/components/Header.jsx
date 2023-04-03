import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pathname, title }) {
  const shouldDisplayIcon = pathname === '/meals' || pathname === '/drinks';
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
        <img
          src={ searchIcon }
          alt="search"
          data-testid="search-top-btn"
        />
      )}
    </div>
  );
}

export default Header;

Header.propTypes = {
  history: PropTypes.object,
}.isRequired;
