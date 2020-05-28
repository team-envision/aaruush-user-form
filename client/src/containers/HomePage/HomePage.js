import React, { Component } from "react";
import { connect } from "react-redux";

import HomePageForm from "../../components/HomePageForm/HomePageForm";
import Introduction from "../../components/Introduction/Introduction";
import Jumbotron from "../../components/UI/Jumbotron/Jumbotron";
import Sent from "../../components/UI/Sent/Sent";
import * as actions from "../../store/actions/index";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Introduction />
          {this.props.sent ? (
            <Sent />
          ) : (
            <Jumbotron>
              <HomePageForm
                onSubmitForm={(values) => this.props.onSubmitForm(values)}
              />
            </Jumbotron>
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
