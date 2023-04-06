import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import Footer from '../components/Footer';

describe('Testando as funcionalidades da aplicação', () => {
  it('testa se existem botoes, imagens e redirecionamento no componente footer', () => {
    const { history } = renderWithRouter(<Footer />);

    const buttonDrinks = screen.getByTestId('drinks-bottom-btn');
    const imgDrinks = screen.getByAltText('Logo de uma colher e faca');
    const buttonMeals = screen.getByTestId('meals-bottom-btn');
    const imgMeals = screen.getByAltText('Logo de uma taça');
    // const buttonProfile = screen.getByTestId('profile-top-btn');
    const footer = screen.getByTestId('footer');

    expect(buttonDrinks).toBeVisible();
    expect(imgDrinks).toBeVisible();
    expect(buttonMeals).toBeVisible();
    expect(imgMeals).toBeVisible();
    expect(footer).toBeVisible();

    userEvent.click(buttonDrinks);
    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');

    act(() => {
      history.push('/profile');
    });

    expect(footer).toBeVisible();
  });
});
