import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";

import "./LogInForm.css";

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
    <div className="form-group">
      <h1 className="col-12 text-center"> Log In! </h1>
      <form onSubmit={formik.handleSubmit} className="login col-11 col-md-9">
        <div>
          <label htmlFor="username" className="label_username text-center">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="username col-11"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />

          {formik.touched.username && formik.errors.username ? (
            <div className="error col-12">{formik.errors.username}</div>
          ) : null}
        </div>

        <br />

        <label htmlFor="password" className="label_password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="password col-11"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}

        <br />

        <div className="col-12 text-center">
          <Button type="submit" color="success" className="btn col-6">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
