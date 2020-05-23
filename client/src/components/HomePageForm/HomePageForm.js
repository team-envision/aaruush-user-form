import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ScriptTag from "react-script-tag";

import "./HomePageForm.css";

const HomePageForm = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      city: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("We know you have a Name"),
      city: Yup.string().required("No city provided."),
      content: Yup.string().required("No Content provided."),
    }),

    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit} className="login">
        <div className="form-group">
          <label htmlFor="name" className="label_name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />

          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}

          <br />

          <label htmlFor="city" className="label_city">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />

          {formik.touched.city && formik.errors.city ? (
            <div className="error">{formik.errors.city}</div>
          ) : null}

          <br />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            type="text"
            rows="7"
            className="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />

          {formik.touched.content && formik.errors.content ? (
            <div className="error">{formik.errors.content}</div>
          ) : null}

          <br />

          <input type="file" name="file" id="file" class="inputfile" />
          <p className="inputFile">
            <label for="file">Choose a file</label>
          </p>
          <br />

          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default HomePageForm;
