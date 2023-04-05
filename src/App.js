import React from 'react';
import HeaderProvider from './context/HeaderProvider';
import RecipeProvider from './context/RecipeProvider';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <RecipeProvider>
        <HeaderProvider>
          <Routes />
        </HeaderProvider>
      </RecipeProvider>
    );
  }
}

export default App;
