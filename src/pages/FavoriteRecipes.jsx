import Header from '../components/Header';
import Filters from '../components/Filters';
import GetRecipesCard from '../components/GetRecipesCard';

function FavoriteRecipes() {
  return (
    <>
      <Header title="Favorite Recipes" />

      <Filters />

      <GetRecipesCard LSItem="favoriteRecipes" />
    </>
  );
}

export default FavoriteRecipes;
