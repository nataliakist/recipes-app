import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente Recipes', () => {
  it('Testa se o componente renderiza corretamente ao entrar na página', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/meals');
      });
      expect(history.location.pathname).toBe('/meals');
      const corba = await screen.findByText('Corba');
      expect(corba).toBeInTheDocument();
    }, { timeout: 5000 });
  });
  it('Testa se o componente renderiza corretamente os botões de filtro e suas funções ao entrar na página', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/meals');
      });
      expect(history.location.pathname).toBe('/meals');
      const buttons = await screen.findAllByRole('button');
      expect(buttons).toHaveLength(9);
      act(() => {
        userEvent.click(buttons[3]);
      });
      const breakfest = await screen.findByText('Breakfast Potatoes');
      expect(breakfest).toBeInTheDocument();
      act(() => {
        userEvent.click(buttons[3]);
      });
      const corba = await screen.findByText('Corba');
      expect(corba).toBeInTheDocument();
    }, { timeout: 5000 });
  });
  it('Testa se o botão All funciona corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/meals');
      });
      expect(history.location.pathname).toBe('/meals');
      const buttons = await screen.findAllByRole('button');
      expect(buttons).toHaveLength(9);
      act(() => {
        userEvent.click(buttons[3]);
      });
      const breakfest = await screen.findByText('Breakfast Potatoes');
      expect(breakfest).toBeInTheDocument();
      act(() => {
        userEvent.click(buttons[1]);
      });
      const corba = await screen.findByText('Corba');
      expect(corba).toBeInTheDocument();
    }, { timeout: 5000 });
  });
  it('Testa se ao clicar em uma receita, abre a sua página de detalhes', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/meals');
      });
      expect(history.location.pathname).toBe('/meals');
      const corba = await screen.findByText('Corba');
      expect(corba).toBeInTheDocument();
      act(() => {
        userEvent.click(corba);
      });
      expect(history.location.pathname).toBe('/meals/52977');
    }, { timeout: 5000 });
  });
});
