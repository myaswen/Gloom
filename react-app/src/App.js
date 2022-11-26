import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import "./App.css";
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import Dashboard from './components/Dashboard/Dashboard';
import SideMenu from './components/SideMenu/SideMenu';
import NotebookView from './components/NotebookView/NotebookView';
import NotFound from './components/NotFound/NotFound';
import PageView from './components/PageView/PageView';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;

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

        <Route path='/notebooks/:notebookId/pages/:pageId'>
          <div id='route-wrapper'>
            <SideMenu user={user} />
            <NotebookView />
            <PageView />
          </div>
        </Route>

        <Route path='/notebooks/:notebookId'>
          <div id='route-wrapper'>
            <SideMenu user={user} />
            <NotebookView />
          </div>
        </Route>

        <Route>
          <NotFound />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
