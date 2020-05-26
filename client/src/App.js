import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import HomePage from "./containers/HomePage/HomePage";
import ThankYou from "./containers/ThankYou/ThankYou";
import AdminLogIn from "./containers/LogIn/LogIn";
import Records from "./containers/Records/Records";
import NotFound from "./components/404/404";
import Forbidden from "./components/403/403";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("authToken")) {
      this.props.onCheckLogin();
    }
  }
  render() {
    let routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/thank-you" exact component={ThankYou} />
          <Route path="/403" exact component={Forbidden} />
          <Route path="/admin/login" exact component={AdminLogIn} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Route exact path="/admin/records">
          <Redirect to="/admin/login" />
        </Route>
      </React.Fragment>
    );

    if (this.props.isAuth) {
      routes = (
        <React.Fragment>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/thank-you" exact component={ThankYou} />
            <Route path="/403" exact component={Forbidden} />
            <Route path="/admin/login" exact component={AdminLogIn} />
            <Route path="/admin/records" exact component={Records} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Route exact path="/admin/login">
            <Redirect to="/admin/records" />
          </Route>
        </React.Fragment>
      );
    }

    return <React.Fragment>{routes}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckLogin: () => dispatch(actions.checkLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
