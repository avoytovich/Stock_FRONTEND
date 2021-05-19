import React, { useEffect, useReducer } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from './helper/history';
import Context from './helper/context';
import generalReducer from './utils/generalReducer';
import { Home, LandingPage, Test } from './components';
import checkAuth from './helper/redirections';

const App = props => {

  const [store, dispatch] = useReducer(generalReducer, {});

  useEffect(() => {}, []);

  //console.log('store', store);
  return(
    <Context.Provider value={{dispatch, store}}>
      <Router history={history}>
        <Switch>
          <Route path="/bookmark" component={LandingPage} />
          <Route path="/user/:id" render={() => (
            checkAuth() ? (
              <Redirect to="/bookmark"/>
            ) : (
              <Home test='test'/>
            )
          )}/>
          <Route path="/test" render={() => (
            checkAuth() ? (
              <Redirect to="/bookmark"/>
            ) : (
              <Test />
            )
          )}/>
          <Redirect from="/" to="/bookmark" />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
