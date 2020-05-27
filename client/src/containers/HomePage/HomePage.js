import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import HomePageForm from "../../components/HomePageComponent/HomePageForm";
import Sent from "../../components/UI/Sent/Sent";
import * as actions from "../../store/actions/index";
import classes from "./HomePage.module.css";
import aaruush_logo from "../../assets/images/aaruush_logo.png";
import medicTeam from "../../assets/images/medic-team.png";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          {this.props.sent ? (
            <Sent />
          ) : (
            <React.Fragment>
              <img
                src={aaruush_logo}
                alt="aaruush_logo"
                className={classes.aaruush_logo + " col-10 col-md-3"}
              />
              <HomePageForm
                onSubmitForm={(values) => this.props.onSubmitForm(values)}
                fileUploaded={(file) => console.log(file)}
              >
                <Container className={classes.container}>
                  <div className="mt-4 text-center">
                    <h1 className="display-5">SALUTE TO THE UNSUNG HEROES</h1>
                    <div className="row">
                      <div className=" col-12 col-lg-6">
                        <div
                          className={
                            classes.content_p + " text-center text-md-left"
                          }
                        >
                          <p className="">
                            While we sit safely in our homes, some spend days
                            and nights to fight this pandemic. Putting their
                            lives at risk, they serve this nation diligently.
                            Team Aaruush takes this moment, to thank their
                            efforts and pray for their well-being.
                          </p>
                          <p className="">
                            To show our gratitude towards their selflessness, we
                            request you to share with us a picture of any known
                            corona warriors and also write a little something to
                            express your wishes and appreciation for them. We
                            will present these little anecdotes to the helping
                            organisations for the sense of thankfulness of our
                            unsung heroes keeping the health and safety afloat
                            in these times of crisis.
                          </p>
                        </div>
                      </div>
                      <img
                        src={medicTeam}
                        alt="medicTeam"
                        className="col-12 col-lg-6"
                      />
                    </div>
                  </div>
                </Container>
              </HomePageForm>
            </React.Fragment>
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
