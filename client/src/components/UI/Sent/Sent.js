import React from "react";

import "./Sent.css";

const Sent = () => {
  return (
    <React.Fragment>
      <div className="col-6 container">
        <svg viewBox="0 0 120 120">
          <g class="g1">
            <rect class="r1" x="30" y="30" width="60" height="60" />
            <rect class="big" x="81" y="81" width="8" height="8" />
            <rect class="r_ol" x="31" y="31" width="8" height="8" />
            <rect class="r_or" x="81" y="31" width="8" height="8" />
            <rect class="r_ul" x="31" y="81" width="8" height="8" />
            <xrect class="r_ur" x="81" y="81" width="8" height="8" />
          </g>
        </svg>
      </div>
    </React.Fragment>
  );
};

export default Sent;
