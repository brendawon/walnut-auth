//routes for application: login screen & home page after login

import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          {/** if not logged in, render login/signup */}
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          {/** when logged in, render home page */}
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
