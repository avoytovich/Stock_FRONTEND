import React, { useEffect, useReducer } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from './helper/history';
import Context from './helper/context';
import generalReducer from './utils/generalReducer';
import { Home, Landing, Test, Login } from './components';
import checkAuth from './helper/redirections';

const App = props => {
  const [store, dispatch] = useReducer(generalReducer, {});

  useEffect(() => {}, []);

  //console.log('store', store);
  return (
    <Context.Provider value={{ dispatch, store }}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route
            path="/user/:id"
            render={() =>
              checkAuth() ? <Redirect to="/login" /> : <Home test="test" />
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
