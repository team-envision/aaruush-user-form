import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import LogInForm from "../../components/LogInForm/LogInForm";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <LogInForm onSubmitForm={(values) => this.props.onLogin(values)} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (data) => {
      console.log(data);
      dispatch(actions.login(data.username, data.password));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
