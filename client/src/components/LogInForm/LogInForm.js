import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./LogInForm.css";

const LogInForm = (props) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("We need it to verify"),
      password: Yup.string().required("We need it to verify"),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  return (
    <div className="main text-center">
      <form onSubmit={formik.handleSubmit} className="form-group">
        <h1 className="col-12 text-center"> Log In! </h1>
        <div className="col-12">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
        </div>
        <br />

        <div className="col-12">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="col-12">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
