import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

import { localStorageMock } from '../setupTests';
import RecipeInProgress from '../pages/RecipeInProgress';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import { getDetailedDrink } from '../services/drinksAPI';
import { getDetailedMeals } from '../services/mealsAPI';
import meal from './mocks/mealA';

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Testes de cobertura de página para página receitas em progresso', () => {
  const favoriteRecipesMock = [{
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  }];

  it('', async () => {
    const { history } = renderWithRouter(<RecipeInProgress />);
    await act(async () => {
      history.push('/meals/53065/in-progress');
    });
    waitFor(() => {
      const title = screen.getByTestId('recipe-title');
      const category = screen.getByTestId('recipe-category');
      const recipeImg = screen.getByAltText('recipe');
      const instructions = screen.getByTestId('instructions');
      const ingredientList = screen.getAllByRole('listitem');
      // console.log(ingredientList.length);
      expect(title).toBeVisible();
      expect(category).toBeInTheDocument();
      expect(recipeImg).toBeVisible();
      expect(instructions).toBeInTheDocument();
      expect(ingredientList.length).toBe(8);
    });
  });

  it('Testes de cobertura botão de favoritos', async () => {
    localStorageMock.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    localStorageMock.setItem('inProgressRecipes', JSON.stringify({}));
    localStorageMock.setItem('doneRecipes', JSON.stringify([]));
    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals/52771/in-progress');
    });
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favoriteBtn);
    waitFor(() => {
      expect(favoriteBtn.toHaveAttribute('src', whiteHeartIcon));
    });
  });

  it('Testes de cobertura botão share', async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals/52771/in-progress');
    });
    const shareBtn = await screen.findByTestId('share-btn');
    userEvent.click(shareBtn);
    waitFor(() => {
      // const message = screen.getByText('Link copied!');
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/meals/52771/in-progress');
    });
  });

  it('Teste de funcionalidade das checkbox', async () => {
    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals/53060/in-progress');
    });
    const checks = await screen.findAllByRole('checkbox');
    const listIng = await screen.findAllByRole('listitem');
    expect(checks).toHaveLength(6);
    expect(checks[0]).not.toBeChecked();
    expect(listIng[0]).not.toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    userEvent.click(checks[0]);
    expect(listIng[0]).toHaveStyle('text-decoration: line-through solid rgb(0, 0, 0)');
    expect(checks[0]).toBeChecked();
  });
  it('Teste de funcionalidade das checkbox - localStorage', async () => {
    const { history } = renderWithRouter(<RecipeInProgress />);
    await act(async () => {
      history.push('/meals/53060/in-progress');
    });
    waitFor(() => {
    });
  });
});
