import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as faceapi from 'face-api.js';

import Login from 'pages/login';
import Chat from 'pages/chat';

const App = () => {
  const [loadingModels, setLoadingModels] = useState<
    'loading' | 'success' | null
  >(null);

  if (loadingModels === null) {
    setLoadingModels('loading');
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(() => setLoadingModels('success'));
  }

  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat">
          <Chat modelStatus={loadingModels} />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default App;
