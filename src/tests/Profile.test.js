import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import { localStorageMock } from '../setupTests';
import Profile from '../pages/Profile';

describe('Profile', () => {
  // beforeEach(() => {
  //   localStorageMock.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));

  //   Object.defineProperty(global, 'localStorage', { value: localStorageMock });
  // });

  it('Testando se os inputs da página Login funcionam corretamente', () => {
    localStorageMock.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(<Profile />);

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
  it('Testa se ao clica no botão favorite redireciona para pagina favorites-recipes', async () => {
    localStorageMock.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(<Profile />);

    const favoriteButton = screen.getByTestId('profile-favorite-btn');

    userEvent.click(favoriteButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testa se ao clica no botão favorite redireciona para pagina favorites-recipes', async () => {
    localStorageMock.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(<Profile />);

    const logOutButton = screen.getByTestId('profile-logout-btn');

    userEvent.click(logOutButton);

    expect(history.location.pathname).toBe('/');
  });
  it('', () => {
    localStorageMock.setItem('user', JSON.stringify(null));

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    renderWithRouter(<Profile />);
    const profileE = screen.getByTestId('profile-email');
    expect(profileE).toBeInTheDocument();
  });
  it('', () => {
    localStorageMock.setItem('user', JSON.stringify(null));
    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    renderWithRouter(<Profile />);
    const profileE = screen.getByTestId('profile-email');
    expect(profileE).toBeInTheDocument();
  });
});
