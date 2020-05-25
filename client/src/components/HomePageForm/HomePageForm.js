import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";
import "./HomePageForm.css";

const HomePageForm = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      city: "",
      message: "",
      attachment: null,
      isAttached: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("We know you have a Name"),
      city: Yup.string().required("No city provided."),
      isAttached: Yup.boolean(),
      attachment: Yup.mixed().when("isAttached", {
        is: true,
        then: Yup.mixed()
          .test(
            "fileSize",
            "Should be less than equal to 10mb",
            (value) => value && value.size <= 10485760
          )
          .test(
            "fileFormat",
            "Unsupported Format",
            (value) =>
              value &&
              ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(
                value.type
              )
          ),
      }),
    }),
    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  function captchaValue(value) {
    formik.setFieldValue("recaptcha", value);
    console.log(value);
  }
  console.log(process.env);
  return (
    <React.Fragment>
      <form
        onSubmit={formik.handleSubmit}
        className="login col-10 col-md-8"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label htmlFor="name" className="label_name text-center">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="name col-12 col-sm-6"
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
            className="city col-12 col-sm-6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />

          {formik.touched.city && formik.errors.city ? (
            <div className="error">{formik.errors.city}</div>
          ) : null}

          <br />

          <label htmlFor="message">Content</label>
          <textarea
            id="message"
            name="message"
            type="text"
            rows="7"
            className="content col-12 col-sm-8"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />

          <br />

          <input
            id="attachment"
            name="attachment"
            type="file"
            className="inputfile"
            onChange={(event) => {
              if (event.target.files[0]) {
                formik.setFieldValue("isAttached", true);
                formik.setFieldValue("attachment", event.target.files[0]);
              } else {
                formik.setFieldValue("isAttached", false);
              }
              console.log(event.target.files[0]);
            }}
          />

          {formik.values.attachment !== null && formik.errors.attachment ? (
            <div className="error">{formik.errors.attachment}</div>
          ) : null}
          <br />

          <div className="col-12 recaptcha text-center">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={captchaValue}
            />
          </div>

          <div className="col-12 text-center">
            <Button className="btn" color="info" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default HomePageForm;
