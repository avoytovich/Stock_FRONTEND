import React, { useEffect, useReducer } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createPersistedReducer from 'use-persisted-reducer'

import history from './helper/history';
import Context from './helper/context';
import generalReducer from './utils/generalReducer';
import { Dashboard, Landing, Test, Login } from './components';
import checkAuth from './helper/redirections';

const App = props => {
  const usePersistedReducer = createPersistedReducer('state');
  const [store, dispatch] = usePersistedReducer(generalReducer, {});

  useEffect(() => {}, []);

  //console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route
            path="/user/dashboard"
            render={() =>
              checkAuth() ? <Redirect to="/login" /> : <Dashboard test="test" />
            }
          />
          <Route
            path="/test"
            render={() => (checkAuth() ? <Redirect to="/login" /> : <Test />)}
          />
          <Redirect from="/" to="/" />
        </Switch>
      </Router>
    </Context.Provider>
  );
};

export default App;
