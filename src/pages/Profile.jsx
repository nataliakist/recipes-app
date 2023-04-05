import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';

function Profile() {
  const history = useHistory();
  // const { email } = useContext(HeaderContext);
  const userEmail = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header title="Profile" />
      <p
        data-testid="profile-email"
      >
        { userEmail.email }
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
