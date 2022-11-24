import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';

import SplashPage from './components/SplashPage/SplashPage';
// import LogoutButton from './components/LogoutButton';
import Dashboard from './components/Dashboard/Dashboard';

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
          <Dashboard />
        </Route>

        <Route path='/' exact={true} >
          <Redirect to='/dashboard' />;
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
