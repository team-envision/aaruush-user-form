import React from "react";

import classes from "./Jumbotron.module.css";
import teamEnvision_logo from "../../../assets/images/teamEnvision_logo.png";

const Jumbotron = (props) => {
  return (
    <React.Fragment>
      <div className={classes.jumbotronMain + " col-11 col-lg-9"}>
        {props.children}
      </div>
      <div className="col-12 text-center">
        <img
          src={teamEnvision_logo}
          alt="teamEnvision_logo"
          className="col-8 col-md-3 mb-3 mt-0"
        />
      </div>
    </React.Fragment>
  );
};

export default Jumbotron;
