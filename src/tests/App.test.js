import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

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
});
