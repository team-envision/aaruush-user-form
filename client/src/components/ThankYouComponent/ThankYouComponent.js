import React from "react";
import Icon from "react-icons-kit";
import { instagram } from "react-icons-kit/fa/instagram";
import { facebook } from "react-icons-kit/fa/facebook";

import classes from "./ThankYouComponent.module.css";

const ThankYouComponent = () => {
  return (
    <React.Fragment>
      <div className="mx-auto col-10 text-center">
        <h2 className="col-12">Thank you for your response</h2>
        <br />
        <div className="col-12">
          <p>
            Every word of your appreciation will mean the world to the front
            line fighters and daily workers. Team Aaruush thanks you for
            contributing in your own way to this initiative of ours.
          </p>
          <div>
            <p>
              Kindly follow our Social Handles
              <br />
              <i>
                <h5 className={classes.socialHandles}>
                  <a
                    href="https://www.facebook.com/aaruush.srm"
                    className={classes.HREF + " " + classes.fb}
                  >
                    <Icon
                      icon={facebook}
                      size={28}
                      style={{ color: "#ab2e8e" }}
                    />
                    /aaruush
                  </a>

                  <br />

                  <a
                    href="https://www.instagram.com/aaruush_srm/?hl=en"
                    className={classes.HREF + " " + classes.insta}
                  >
                    <Icon
                      icon={instagram}
                      size={28}
                      style={{ color: "#4064ad" }}
                    />
                    /aaruush_srm
                  </a>
                </h5>
              </i>
              for more updates.
            </p>
          </div>
          <p>
            <b>Share among your family and friends!</b>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ThankYouComponent;
