import { Route, Switch } from 'react-router-dom';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import DetailedRecipe from './pages/DetailedRecipe';

function Routes() {
  return (
    <Switch>
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/meals/:mealsId" component={ DetailedRecipe } />
      <Route exact path="/drinks/:drinksId" component={ DetailedRecipe } />
      <Route
        exact
        path="/meals/:mealsId/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/drinks/:drinksId/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
