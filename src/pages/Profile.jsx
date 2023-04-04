import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';
import HeaderContext from '../context/HeaderContext';

function Profile() {
  const history = useHistory();
  const { email } = useContext(HeaderContext);

  return (
    <div>
      <Header title="Profile" />
      <p
        data-testid="profile-email"
      >
        { email }
      </p>
      <Button
        label="Done Recipes"
        type="button"
        dataTestId="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      />
      <Button
        label="Favorite Recipes"
        type="button"
        dataTestId="profile-favorite-btn"
        onClick={ () => history.push('favorite-recipes') }
      />
      <Button
        label="Logout"
        type="button"
        dataTestId="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      />
    </div>

  );
}

export default Profile;
