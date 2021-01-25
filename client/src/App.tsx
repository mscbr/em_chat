import { Route, Switch, Redirect } from 'react-router-dom';

import Login from 'pages/login';
import Chat from 'pages/chat';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat">
          <Chat />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
