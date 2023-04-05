import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals({ history }) {
  return (
    <div>
      <Header title="Meals" pathname="/meals" />
      <button
        onClick={ () => history.push('/meals/id') }
        type="button"
      >
        Tela de receitas detalhadas
      </button>
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Meals;
