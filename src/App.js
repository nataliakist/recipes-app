import React from 'react';
import Routes from './Routes';

import Footer from './components/Footer';
import './styles.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
