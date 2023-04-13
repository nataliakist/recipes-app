import GetRecipesCard from '../components/GetRecipesCard';
import Header from '../components/Header';
import Filters from '../components/Filters';

function DoneRecipes() {
  return (
    <main>
      <Header title="Done Recipes" />

      <Filters />

      <GetRecipesCard LSItem="doneRecipes" />
    </main>
  );
}

export default DoneRecipes;
