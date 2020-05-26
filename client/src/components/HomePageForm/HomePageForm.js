import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Label } from "reactstrap";
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
      name: Yup.string()
        .required("We know you have a Name")
        .min(2, "It's got to be longer"),
      city: Yup.string().required("You dont live anywhere?"),
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
              [
                "image/jpg",
                "image/jpeg",
                "image/png",
                "video/mp4",
                "video/x-msvideo",
              ].includes(value.type)
          ),
      }),
    }),
    onSubmit: (values) => {
      props.onSubmitForm(values);
    },
  });

  function captchaValue(value) {
    formik.setFieldValue("recaptcha", value);
  }

  return (
    <React.Fragment>
      {props.children}
      <Form
        onSubmit={formik.handleSubmit}
        className="login col-10 col-md-8"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <Label htmlFor="name" className="label_name text-center">
            Name
          </Label>
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

          <Label htmlFor="city" className="label_city">
            City
          </Label>
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

          <Label htmlFor="message">Content</Label>
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
          <div class="button-wrap">
            <label className="new-button text-center" for="attachment">
              Attach File
            </label>
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
              }}
            />
          </div>

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
            <Button
              className="btn"
              color="info"
              type="submit"
              disabled={formik.values.recaptcha ? false : true}
            >
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default HomePageForm;
