import React from "react";
import { Container } from "reactstrap";

import classes from "./Introduction.module.css";
import aaruush_logo from "../../assets/images/aaruush_logo.png";
import heroes from "../../assets/images/heroes.png";

const Introduction = () => {
  const content = (
    <div className={classes.content_p}>
      <p className="text-justify">
        While we sit safely in our homes, some spend days and nights, risking
        their lives to fight this pandemic. Team Aaruush attempts to thank their
        efforts and pray for their well-being.
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
    <div className={classes.bgColor + " pb-3"}>
      <img
        src={aaruush_logo}
        alt="aaruush_logo"
        className={classes.aaruush_logo + " col-10 col-md-6 col-lg-3 mx-auto"}
      />

      <React.Fragment>
        <Container className={classes.container}>
          <div className="mt-4 text-center">
            <h1 className="display-5">SALUTE TO THE UNSUNG HEROES</h1>
            <div className="row">
              <div className=" col-12 col-lg-6">
                {window.innerWidth < 991 ? heroesImg : content}
              </div>
              {window.innerWidth < 991 ? content : heroesImg}
            </div>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default Introduction;
