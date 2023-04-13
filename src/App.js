import React from 'react';
import HeaderProvider from './context/HeaderProvider';
import RecipeProvider from './context/RecipeProvider';
import GetRecipesProvider from './context/GetRecipesProvider';
import Routes from './Routes';
import './styles.css';

class App extends React.Component {
  render() {
    return (
      <RecipeProvider>
        <HeaderProvider>
          <GetRecipesProvider>
            <Routes />
          </GetRecipesProvider>
        </HeaderProvider>
      </RecipeProvider>
    );
  }
}

export default App;
