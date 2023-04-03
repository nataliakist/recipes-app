import React from 'react';
import { render, screen } from '@testing-library/react';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando as funcionalidades da aplicação', () => {
  it('Testando a página Login', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/Login/i);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(title).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })
});
