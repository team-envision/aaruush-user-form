import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Label, CustomInput } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

import "./HomePageForm.css";
import teamEnvision_logo from "../../assets/images/teamEnvision_logo.png";

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
        .required("❗ We know you have a Name")
        .min(2, "❗ It's got to be longer"),
      city: Yup.string().required("❗ Our owl will get lost without this"),
      isAttached: Yup.boolean(),
      attachment: Yup.mixed().when("isAttached", {
        is: true,
        then: Yup.mixed()
          .test(
            "fileSize",
            "❗ Too large file",
            (value) => value && value.size <= 10485760
          )
          .test(
            "fileFormat",
            "❗ Unsupported Format",
            (value) =>
              value &&
              [
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/svg",
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
      <div className="form-group">
        <Form
          onSubmit={formik.handleSubmit}
          className="login col-11 col-md-9"
          encType="multipart/form-data"
        >
          <div>
            <Label htmlFor="name" className="label_name text-center">
              Name
            </Label>
            <input
              id="name"
              name="name"
              type="text"
              className="name col-11"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error col-12">{formik.errors.name}</div>
            ) : null}

            <br />

            <Label htmlFor="city" className="label_city">
              City
            </Label>
            <input
              id="city"
              name="city"
              type="text"
              className="city col-11"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />

            {formik.touched.city && formik.errors.city ? (
              <div className="error col-12">{formik.errors.city}</div>
            ) : null}

            <br />

            <Label className="label_message">Your Message</Label>
            <div className="text-center">
              <CustomInput
                type="file"
                id="attachment"
                name="customFile"
                label="Choose one file"
                className="file col-11"
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
              <div className="error col-12">{formik.errors.attachment}</div>
            ) : null}

            <textarea
              id="message"
              name="message"
              type="text"
              rows="7"
              placeholder="Something you want to write about"
              className="message col-11"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />

            <br />

            <br />

            <div className="recaptcha">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={captchaValue}
                style={{
                  transform: "scale(0.77)",
                  WebkitTransform: "scale(0.77)",
                }}
              />
            </div>

            <div className="col-12 text-center">
              <Button
                className="btn col-6"
                color="success"
                type="submit"
                disabled={formik.values.recaptcha ? false : true}
                onClick={() => {
                  if (
                    formik.errors.name ||
                    formik.errors.city ||
                    formik.errors.message ||
                    formik.errors.attachment
                  ) {
                    alert("Please check the inputs for errors");
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
        <div className="text-center teamEnvision_logo">
          <img
            src={teamEnvision_logo}
            alt="teamEnvision_logo"
            className="col-8 col-md-3"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePageForm;
