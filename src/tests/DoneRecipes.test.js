import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';

const doneRecipes = [
  {
    image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
    name: 'Apple Frangipan Tart',
    alcoholicOrNot: null,
    doneDate: '10/04/2023',
    id: '52768',
    type: 'meal',
    nacionality: 'British',
    category: 'Dessert',
    tags: ['Tart', 'Baking'],
  },
  {
    image: 'https://www.thecocktaildb.com/images/media/drink/jgvn7p1582484435.jpg',
    name: 'Caipirinha',
    alcoholicOrNot: 'Alcoholic',
    doneDate: '10/04/2023',
    id: '11202',
    type: 'drink',
    nacionality: 'Brazilian',
    category: 'Ordinary Drink',
    tags: [],

  },
];

describe('Testa Done Recipes', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  it('Verifica se os elementos do Header e do Footer são renderizados na tela', () => {
    // expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });
  it('Verifica se os botões de filtro são renderizados na tela', async () => {
    renderWithRouter(<DoneRecipes />);
    await waitFor(() => {
      expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
      expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
      expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    });
  });
  it('Verifica se as informações das receitas feitas são renderizadas corretamente na tela', () => {

  });
  it('Verifica o filtro Meals', () => {

  });
  it('Verifica o filtro Drinks', () => {

  });
  it('Verifica a função de copiar link', () => {

  });
});
