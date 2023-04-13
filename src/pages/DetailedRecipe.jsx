import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import DetailedRecipeCard from '../components/DetailedRecipeCard';
import RecipeContext from '../context/RecipeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DetailedRecipes() {
  const { setId } = useContext(RecipeContext);
  const { drinksId, mealsId } = useParams();

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('meals')) {
      setId(mealsId);
    } else {
      setId(drinksId);
    }
  }, [setId, drinksId, mealsId, pathname]);

  return (
    <>
      { pathname.includes('meals') ? (
        <Header title="Deailed Meals" />
      ) : (
        <Header title="Detailed Drinks" />
      )}
      <DetailedRecipeCard />
      <Footer />
    </>
  );
}

export default DetailedRecipes;
