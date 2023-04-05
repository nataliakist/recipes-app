import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Meals({ history }) {
  return (
    <>
      <Header title="Meals" pathname="/meals" />
      <button
        onClick={ () => history.push('/meals/id') }
        type="button"
      >
        Tela de receitas detalhadas
      </button>
    </>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Meals;
