import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "reactstrap";

import classes from "./LogInForm.module.css";

const LogInForm = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("❗ We need it to verify"),
      password: Yup.string().required("❗ We need it to verify"),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  return (
    <React.Fragment>
      <h1 className="col-12 text-center"> Log In! </h1>
      <Form onSubmit={formik.handleSubmit} className="mx-auto col-6">
        <div>
          <label htmlFor="username" className={classes.label_username}>
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={classes.username + " col-11"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />

          {formik.touched.username && formik.errors.username ? (
            <div className={classes.error + " col-12"}>
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <br />

        <label htmlFor="password" className={classes.label_password}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className={classes.password + " col-11"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className={classes.error + " col-12"}>
            {formik.errors.password}
          </div>
        ) : null}

        <br />

        <div className="col-12 text-center">
          <Button
            type="submit"
            color="success"
            className={classes.btn + " col-6"}
          >
            Submit
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default LogInForm;
