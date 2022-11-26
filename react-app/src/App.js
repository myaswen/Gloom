import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from './store/session';
import "./App.css";

import SplashPage from './components/SplashPage/SplashPage';
import Dashboard from './components/Dashboard/Dashboard';
// import SideMenu from './components/Dashboard/SideMenu/SideMenu';
// import NotebooksView from './components/Dashboard/NotebooksView/NotebooksView';
import SideMenu from './components/SideMenu/SideMenu';
import NotebooksView from './components/NotebooksView/NotebooksView';

function App() {
  const user = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
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
          <div id='route-wrapper'>
            <SideMenu user={user} />
            <Dashboard />
          </div>
        </Route>

        <Route path='/' exact={true} >
          <Redirect to='/dashboard' />;
        </Route>

        <Route path='/notebooks/:notebookId'>
          <div id='route-wrapper'>
            <SideMenu user={user} />
            <NotebooksView />
          </div>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
