import React from "react";

import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.cubeGrid}>
      <div className={classes.cube + " " + classes.cube1}></div>
      <div className={classes.cube + " " + classes.cube2}></div>
      <div className={classes.cube + " " + classes.cube3}></div>
      <div className={classes.cube + " " + classes.cube4}></div>
      <div className={classes.cube + " " + classes.cube5}></div>
      <div className={classes.cube + " " + classes.cube6}></div>
      <div className={classes.cube + " " + classes.cube7}></div>
      <div className={classes.cube + " " + classes.cube8}></div>
      <div className={classes.cube + " " + classes.cube9}></div>
    </div>
  );
};

export default Spinner;
