import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import HomePageForm from "../../components/HomePageForm/HomePageForm";
import Sent from "../../components/UI/Sent/Sent";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import * as actions from "../../store/actions/index";
import classes from "./HomePage.module.css";

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
            >
              <Container className={classes.container}>
                <div className="text-center mt-4">
                  <h1 className="display-5">A Letter to Silent Heroes</h1>
                  <p className="lead mt-3 mx-auto col-8 col-sm-10 col-lg-12">
                    While we sit safely in our homes, some spend days and nights
                    to fight this pandemic. Putting their lives at risk, they
                    serve this nation diligently. Team Aaruush takes this
                    moment, to thank their efforts and pray for their
                    well-being.
                    <br />
                    To show our gratitude towards their selflessness, we request
                    you to share with us a picture of any known corona warriors
                    and also write a little something to express your wishes and
                    appreciation for them. We will present these little
                    anecdotes to the helping organisations for the sense of
                    thankfulness of our unsung heroes keeping the health and
                    safety afloat in these times of crisis.
                  </p>
                </div>
              </Container>
            </HomePageForm>
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
