import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente Recipes', () => {
  it('Testa se o componente renderiza as receitas ao entrar na página', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/drinks');
      });
      expect(history.location.pathname).toBe('/drinks');
      const GG = await screen.findByText('GG');
      expect(GG).toBeInTheDocument();
      const A1 = await screen.findByText('A1');
      expect(A1).toBeInTheDocument();
    }, { timeout: 5000 });
  });
  it('Testa se os botões de filtro funcionam corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/drinks');
      });
      expect(history.location.pathname).toBe('/drinks');
      const buttons = await screen.findAllByRole('button');
      expect(buttons).toHaveLength(9);
      act(() => {
        userEvent.click(buttons[3]);
      });
      const belmont = await screen.findByText('155 Belmont');
      expect(belmont).toBeInTheDocument();
      act(() => {
        userEvent.click(buttons[3]);
      });
      const GG = await screen.findByText('GG');
      expect(GG).toBeInTheDocument();
    }, { timeout: 5000 });
  });
  it('Testa se o botão All funciona corretamente', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/drinks');
      });
      expect(history.location.pathname).toBe('/drinks');
      const buttons = await screen.findAllByRole('button');
      expect(buttons).toHaveLength(9);
      act(() => {
        userEvent.click(buttons[3]);
      });
      const belmont = await screen.findByText('155 Belmont');
      expect(belmont).toBeInTheDocument();
      act(() => {
        userEvent.click(buttons[1]);
      });
      const GG = await screen.findByText('GG');
      expect(GG).toBeInTheDocument();
    }, { timeout: 5000 });
  });
  it('Testa se ao clicar em uma receita, abre a página de detalhes da mesma', async () => {
    const { history } = renderWithRouter(<App />);

    await waitFor(async () => {
      act(() => {
        history.push('/drinks');
      });
      expect(history.location.pathname).toBe('/drinks');
      const GG = await screen.findByText('GG');
      expect(GG).toBeInTheDocument();
      act(() => {
        userEvent.click(GG);
      });
      expect(history.location.pathname).toBe('/drinks/15997');
      act(() => {
        history.push('/naoexiste');
      });
      expect(history.location.pathname).toBe('/naoexiste');
      expect(GG).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });
});
