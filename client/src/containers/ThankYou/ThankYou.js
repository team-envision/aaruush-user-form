import React, { Component } from "react";

import Introduction from "../../components/Introduction/Introduction";
import ThankYouComponent from "../../components/ThankYouComponent/ThankYouComponent";
import Jumbotron from "../../components/UI/Jumbotron/Jumbotron";

class ThankYou extends Component {
  render() {
    return (
      <React.Fragment>
        <Introduction />
        <Jumbotron>
          <ThankYouComponent />
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default ThankYou;
