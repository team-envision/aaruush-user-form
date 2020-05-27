import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

import HomePageForm from "../../components/HomePageComponent/HomePageForm";
import Sent from "../../components/UI/Sent/Sent";
import * as actions from "../../store/actions/index";
import classes from "./HomePage.module.css";
import aaruush_logo from "../../assets/images/aaruush_logo.png";
import teamEnvision_logo from "../../assets/images/teamEnvision_logo.png";
import heroes from "../../assets/images/heroes.png";

class HomePage extends Component {
  state = {
    viewWidth: null,
  };

  componentWillMount() {
    this.setState({ viewWidth: window.innerWidth });
  }

  render() {
    const content = (
      <div className={classes.content_p}>
        <p className="text-justify">
          While we sit safely in our homes, some spend days and nights, risking
          their lives to fight this pandemic. Team Aaruush attempts to thank
          their efforts and pray for their well-being.
        </p>
        <p className="text-justify">
          To show our gratitude towards their selflessness, we request you to
          share a picture of any known corona warriors and/or a write-up
          expressing your appreciation for them. These little anecdotes will be
          sent to organisations, etc to build a sense of thankfulness in these
          times of crisis.
        </p>
      </div>
    );

    const heroesImg = (
      <React.Fragment>
        <div className="col-1"></div>
        <img src={heroes} alt="heroes" className="col-12 col-lg-5" />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <div>
          <img
            src={aaruush_logo}
            alt="aaruush_logo"
            className={classes.aaruush_logo + " col-10 col-md-3 mx-auto"}
          />
          {this.props.sent ? (
            <Sent />
          ) : (
            <React.Fragment>
              <HomePageForm
                onSubmitForm={(values) => this.props.onSubmitForm(values)}
                fileUploaded={(file) => console.log(file)}
              >
                <Container className={classes.container}>
                  <div className="mt-4 text-center">
                    <h1 className="display-5">SALUTE TO THE UNSUNG HEROES</h1>
                    <div className="row">
                      <div className=" col-12 col-lg-6">
                        {this.state.viewWidth < 991 ? heroesImg : content}
                      </div>
                      {this.state.viewWidth < 991 ? content : heroesImg}
                    </div>
                  </div>
                </Container>
              </HomePageForm>
            </React.Fragment>
          )}
          <div className="col-12 text-center">
            <img
              src={teamEnvision_logo}
              alt="teamEnvision_logo"
              className="col-8 col-md-3 mb-3 mt-0"
            />
          </div>
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
