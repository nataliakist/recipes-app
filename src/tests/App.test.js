import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import Footer from '../components/Footer';

describe('Testando as funcionalidades da aplicação', () => {
  const email = 'email-input';
  const password = 'password-input';
  it('Testando se os inputs da página Login aparecem ao iniciar a aplicação', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/Entrar/i);
    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByRole('button');

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Testando se os inputs da página Login funcionam corretamente', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    act(() => {
      userEvent.type(emailInput, 'teste@teste.com');
      userEvent.type(passwordInput, 'testando');
    });

    expect(button).toBeEnabled();
  });
  it('Testando se os inputs da página Login funcionam corretamente', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(email);
    const passwordInput = screen.getByTestId(password);
    const button = screen.getByTestId('login-submit-btn');

    await waitFor(() => {
      act(() => {
        userEvent.type(emailInput, 'teste@teste.com');
        userEvent.type(passwordInput, 'testando');
        userEvent.click(button);
      });
      expect(history.location.pathname).toBe('/meals');
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
  it('Testando o componente Footer.js', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');
  });
  it('testa se existem botoes, imagens e redirecionamento no componente footer', () => {
    const { history } = renderWithRouter(<Footer />);

    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    const imgDrinks = screen.getByAltText('Logo de uma colher e faca');
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    const imgMeals = screen.getByAltText('Logo de uma taça');

    expect(buttonDrinks).toBeVisible();
    expect(imgDrinks).toBeVisible();
    expect(buttonMeals).toBeVisible();
    expect(imgMeals).toBeVisible();

    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
});
