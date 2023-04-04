import React from 'react';
import HeaderProvider from './context/HeaderProvider';
import Routes from './Routes';

import './styles.css';

class App extends React.Component {
  render() {
    return (
      <HeaderProvider>
        <Routes />
      </HeaderProvider>
    );
  }
}

export default App;
