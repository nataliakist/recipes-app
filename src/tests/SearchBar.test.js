import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const logar = async () => {
  act(() => {
    userEvent.type(screen.getByTestId('email-input'), 'teste@teste.com');
    userEvent.type(screen.getByTestId('password-input'), 'testando');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });
};
const searchBtn = 'search-top-btn';

describe('Barra de Pesquisa - Header', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
  });
  it('Verifica se, ao logar, existe o botão de pesquisar', async () => {
    await waitFor(() => {
      logar();
      expect(screen.getByTestId(searchBtn)).toBeVisible();
    });
  });

  it('Verifica se, ao clicado, exibe os elementos de pesquisa', async () => {
    await waitFor(() => {
      logar();
      act(() => userEvent.click(screen.getByTestId(searchBtn)));
      expect(screen.getByTestId('search-input')).toBeVisible();
      expect(screen.getByTestId('ingredient-search-radio')).toBeVisible();
      expect(screen.getByTestId('name-search-radio')).toBeVisible();
      expect(screen.getByTestId('first-letter-search-radio')).toBeVisible();
      expect(screen.getByTestId('exec-search-btn')).toBeVisible();
    });
  });
  it('Verificação de filtro 1', async () => {
    await waitFor(() => {
      logar();
      act(() => {
        userEvent.click(screen.getByTestId(searchBtn));
      });
      userEvent.type(screen.getByTestId('search-input'), 'potato');
      userEvent.click(screen.getByTestId('name-search-radio'));
      userEvent.click(screen.getByTestId('exec-search-btn'));

    //   const potatoCards = screen.getAllByRole('img');
    //   expect(potatoCards).toHaveLength(9);
    });
  });
});
