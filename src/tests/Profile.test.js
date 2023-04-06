import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import App from '../App';

const logar = () => {
  userEvent.type(screen.getByTestId('email-input'), 'teste@teste.com');
  userEvent.type(screen.getByTestId('password-input'), 'testando');
  userEvent.click(screen.getByTestId('login-submit-btn'));
};

describe('Profile', () => {
  const profileTestId = 'profile-top-btn';
  it('Testando se os inputs da página Login funcionam corretamente', () => {
    const { history } = renderWithRouter(<App />);

    logar();

    waitFor(() => {
      const profileButton = screen.getByTestId(profileTestId);
      expect(profileButton).toBeInTheDocument();

      userEvent.click(profileButton);

      const doneButton = screen.getByTestId('profile-done-btn');
      const favoriteButton = screen.getByTestId('profile-favorite-btn');
      const logOutButton = screen.getByTestId('profile-logout-btn');
      const emailUser = screen.getByTestId('profile-email');

      expect(doneButton).toBeInTheDocument();
      expect(favoriteButton).toBeInTheDocument();
      expect(logOutButton).toBeInTheDocument();
      expect(emailUser).toBeInTheDocument();

      userEvent.click(doneButton);

      expect(history.location.pathname).toBe('/done-recipes');
    });
  });
  it('Testa se ao clica no botão favorite redireciona para pagina favorites-recipes', async () => {
    const { history } = renderWithRouter(<App />);

    logar();
    const profileButton = screen.getByTestId(profileTestId);
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testa se ao clica no botão favorite redireciona para pagina favorites-recipes', async () => {
    const { history } = renderWithRouter(<App />);

    waitFor(() => {
      logar();
      const profileButton = screen.getByTestId(profileTestId);
      expect(profileButton).toBeInTheDocument();

      userEvent.click(profileButton);

      const logOutButton = screen.getByTestId('profile-logout-btn');

      userEvent.click(logOutButton);

      expect(history.location.pathname).toBe('/');
    });
  });
});
