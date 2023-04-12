import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

import { localStorageMock } from '../setupTests';
import RecipeInProgress from '../pages/RecipeInProgress';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';

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
  it.only('Testes de cobertura botão de favoritos', async () => {
    localStorageMock.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
    Object.defineProperty(global, 'localStorage', { value: localStorageMock });

    const { history } = renderWithRouter(<App />);
    await act(async () => {
      history.push('/meals/52771/in-progress');
    });
    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toHaveAttribute('src', whiteHeartIcon);
    // userEvent.click(favoriteBtn);
    // waitFor(() => {
    //   expect(favoriteBtn.toHaveAttribute('src', blackHeartIcon));
    //   expect(localStorageMock).toHaveBeenCalled();
    // });
  });
});
