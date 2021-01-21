import { Route, Switch, Redirect } from 'react-router-dom';

import Login from 'pages/login';
import Chat from 'pages/chat';
import useLocalStorage from 'hooks/useLocalStorage';

const App = () => {
  const [username] = useLocalStorage('username');
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat">
          <Chat username={username} />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
