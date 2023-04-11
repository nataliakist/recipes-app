import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import renderWithRouter from './helpers/renderWithRouter';

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
    tags: ['Tart'],
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
    tags: ['Party'],

  },
];
const imgId1 = '0-horizontal-image';
const imgId2 = '1-horizontal-image';

describe('Testa Done Recipes', () => {
  beforeEach(() => {
    renderWithRouter(<DoneRecipes />);
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  it('Verifica se os elementos do Header são renderizados na tela', () => {
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  it('Verifica se os botões de filtro são renderizados na tela', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });
  it('Verifica se as informações das receitas feitas são renderizadas corretamente na tela', async () => {
    const img1 = await screen.findByTestId(imgId1);
    const name1 = await screen.findByTestId('0-horizontal-name');
    const category1 = await screen.findByTestId('0-horizontal-top-text');
    const date1 = await screen.findByTestId('0-horizontal-done-date');
    const tag1 = await screen.findByTestId('0-Tart-horizontal-tag');
    const shareBtn1 = await screen.findByTestId('0-horizontal-share-btn');

    const img2 = await screen.findByTestId(imgId2);
    const name2 = await screen.findByTestId('1-horizontal-name');
    const category2 = await screen.findByTestId('1-horizontal-top-text');
    const date2 = await screen.findByTestId('1-horizontal-done-date');
    const tag2 = await screen.findByTestId('1-Party-horizontal-tag');
    const shareBtn2 = await screen.findByTestId('1-horizontal-share-btn');

    expect(img1).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(category1).toBeInTheDocument();
    expect(date1).toBeInTheDocument();
    expect(tag1).toBeInTheDocument();
    expect(shareBtn1).toBeInTheDocument();

    expect(img2).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
    expect(date2).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(shareBtn2).toBeInTheDocument();
  });
  it('Verifica o filtro Meals', async () => {
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));

    const img1 = await screen.findByTestId(imgId1);
    expect(img1).toBeInTheDocument();

    expect(screen.queryByTestId(imgId2)).not.toBeInTheDocument();
  });
  it('Verifica o filtro Drinks', async () => {
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    const img2 = await screen.findByTestId(imgId2);
    expect(img2).toBeInTheDocument();

    expect(screen.queryByTestId(imgId1)).not.toBeInTheDocument();
  });
  it('Verifica a função de copiar link', () => {

  });
});
