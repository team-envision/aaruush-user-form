import React, { Component } from "react";
import { connect } from "react-redux";

import HomePageForm from "../../components/HomePageForm/HomePageForm";
import Sent from "../../components/UI/Sent/Sent";
import * as actions from "../../store/actions/index";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          {this.props.sent ? (
            <Sent />
          ) : (
            <HomePageForm
              onSubmitForm={(values) => this.props.onSubmitForm(values)}
              fileUploaded={(file) => console.log(file)}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sent: state.formReducer.sent,
  };
};

const mapDispatchToProps = (dispath) => {
  return {
    onSubmitForm: (values) => {
      dispath(actions.submitForm(values));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
