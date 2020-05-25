import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import HomePage from "./containers/HomePage/HomePage";
import AdminLogIn from "./containers/LogIn/LogIn";

class App extends Component {
  render() {
    console.log(this.props.isAuth);
    return (
      <div>
        <Switch>
          <Route component={HomePage} exact path="/" />
          <Route exact path="/admin/login">
            {this.props.isAuth ? <AdminLogIn /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
  };
};

export default connect(mapStateToProps)(App);
