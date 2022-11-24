import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import SplashPage from './components/SplashPage/SplashPage';
import LogoutButton from './components/LogoutButton';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>

        <Route path='/authenticate' exact={true}>
          <SplashPage />
        </Route>

        <Route path='/dashboard' exact={true}>
          Hi
        </Route>

        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
          <LogoutButton />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
