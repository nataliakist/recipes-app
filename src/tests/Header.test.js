import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

it.skip('Testa se o componente exibe um ícone de perfil, um ícone de pesquisa e um título', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/meals');
  });

  const profileIcon = screen.getByTestId('profile-top-btn');
  const searchIcon = screen.getByTestId('search-top-btn');
  const pageTitle = screen.getByTestId('page-title');
  const allElements = profileIcon && searchIcon && pageTitle;

  expect(allElements).toBeInTheDocument();
});

it.skip('Testa se, ao clicar no botão de profile a página é redirecionada para a rota /profile', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/meals');
  });

  const profileIcon = screen.getByTestId('profile-top-btn');
  userEvent.click(profileIcon);
  const { pathname } = history.location;
  expect(pathname).toBe('/profile');
});

it.skip('Testa se, ao clicar no botão de pesquisar, a barra de pesquisa é renderizada', () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/meals');
  });

  const searchIcon = screen.getByTestId('search-top-btn');
  userEvent.click(searchIcon);
  const searchInput = screen.getByTestId('search-input');
  expect(searchInput).toBeInTheDocument();

  const radioButtons = screen.getAllByRole('radio');
  expect(radioButtons).toHaveLength(3);
});
