import { Switch, Route } from 'react-router-dom';
import { Home, NewContact } from './pages';
import { Container as EditContact } from './pages/EditContact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewContact} />
      <Route path="/edit/:id" component={EditContact} />
    </Switch>
  );
}
