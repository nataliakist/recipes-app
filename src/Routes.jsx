import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

function Routes() {
  return (
    <Switch>
      {/* <Route path="/meals" component={ Meals } />
      <Route path="/meals/:id-da-receita" component={ Meals } />
      <Route path="/meals/:id-da-receita/in-progress" component={ Meals } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/drinks/:id-da-receita" component={ Drinks } />
      <Route path="/drinks/:id-da-receita/in-progress" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
