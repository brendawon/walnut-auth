//routes for application: login screen, signup, & home page after login

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { self } from "./store";

class Routes extends Component {
  componentDidMount() {
    //trigger map dispatch
    this.props.loadSelf();
  }

  render() {
    //mapped state to props
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            {/** when logged in, render home page */}
            <Route path="/home" exact component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            {/** if not logged in, render login/signup */}
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    //if auth.id is true, user is logged in so home page can be rendered; if false, not logged in so display login/signup pages
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSelf() {
      dispatch(self());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
