import React, { useEffect, useRef } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import createPersistedReducer from "use-persisted-reducer";

import history from "./helper/history";
import Context from "./helper/context";
import generalReducer from "./utils/generalReducer";
import { Dashboard, Landing, Test, Login, Notification, Modal } from "./components";
import isAuth from "./helper/redirections";

const App = (props) => {
  const usePersistedReducer = createPersistedReducer("state");
  const [store, dispatch] = usePersistedReducer(generalReducer, {
    activeLink: "How it works",
  });

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
            render={() => (isAuth() ? <Dashboard test="test" /> : <Redirect to="/login" />)}
          />
          <Route path="/test" render={() => (isAuth() ? <Test /> : <Redirect to="/login" />)} />
          <Redirect from="/" to="/" />
        </Switch>
      </Router>
      <Notification />
    </Context.Provider>
  );
};

export default App;
