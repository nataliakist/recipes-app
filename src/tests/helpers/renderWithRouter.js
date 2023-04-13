import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import HeaderProvider from '../../context/HeaderProvider';
import RecipeProvider from '../../context/RecipeProvider';
import DoneRecipesProvider from '../../context/DoneRecipesProvider';

const renderWithRouter = (component, initalEntries = ['/']) => {
  const history = createMemoryHistory({ initalEntries });
  return ({
    ...render(
      <Router history={ history }>
        <HeaderProvider>
          {component}
        </HeaderProvider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouter;
