import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import HeaderProvider from '../../context/HeaderProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
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
