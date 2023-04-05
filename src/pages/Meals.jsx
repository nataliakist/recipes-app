import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals({ history }) {
  const id = '11007';
  return (
    <>
      <div>
        <Header title="Meals" pathname="/meals" />
        <button
          onClick={ () => history.push(`/drinks/${id}`) }
          type="button"
        >
          Tela de drink detalhada
        </button>
      </div>
      <Footer />
    </>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Meals;
