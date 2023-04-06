import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals({ history }) {
  return (
    <>
    <div>
      <Header title="Meals" pathname="/meals" />
      <Recipes />
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
