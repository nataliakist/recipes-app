import { Route, Switch } from 'react-router-dom';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealsRecipeDetail from './pages/MealsRecipeDetails';
import DrinksRecipeDetails from './pages/DrinksRecipeDetails';

function Routes() {
  return (
    <Switch>
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:mealsId" component={ MealsRecipeDetail } />
      <Route exact path="/drinks/:drinksId" component={ DrinksRecipeDetails } />
      { /*
      <Route exact path="/meals/:id-da-receita/in-progress" component={ Meals } />
      <Route exact path="/drinks/:id-da-receita/in-progress" component={ Drinks } />
      */}
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
