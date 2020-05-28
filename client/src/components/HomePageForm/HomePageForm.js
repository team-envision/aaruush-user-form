import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Label, CustomInput } from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

import classes from "./HomePageForm.module.css";

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
                "image/svg+xml",
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
      <Form
        onSubmit={formik.handleSubmit}
        className="mx-auto col-12"
        encType="multipart/form-data"
      >
        <div>
          <Label htmlFor="name" className={classes.label_name}>
            Name
          </Label>
          <input
            id="name"
            name="name"
            type="text"
            className={classes.name + " col-11"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />

          {formik.touched.name && formik.errors.name ? (
            <div className={classes.error + " col-12"}>
              {formik.errors.name}
            </div>
          ) : null}

          <br />

          <Label htmlFor="city" className={classes.label_city}>
            City
          </Label>
          <input
            id="city"
            name="city"
            type="text"
            className={classes.city + " col-11"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />

          {formik.touched.city && formik.errors.city ? (
            <div className={classes.error + " col-12"}>
              {formik.errors.city}
            </div>
          ) : null}

          <br />

          <Label className={classes.label_message}>Your Message</Label>
          <div className="text-center">
            <CustomInput
              type="file"
              id="attachment"
              name="customFile"
              className={classes.file + " col-11"}
              style={{ marginLeft: "0px" }}
              onChange={(event) => {
                if (event.target.files[0]) {
                  formik.setFieldValue("isAttached", true);
                  formik.setFieldValue("attachment", event.target.files[0]);
                } else {
                  formik.setFieldValue("isAttached", false);
                }
              }}
            />
            <div className="col-11 mx-auto">
              <p className={classes.fileSpecs + " text-left text-muted"}>
                Less than <strong>10 MB</strong>.
                <br />
                Supported extensions
                <strong> .jpeg | .jpg | .png | .svg | .mp4 | .avi</strong>
              </p>
            </div>
          </div>
          {formik.values.attachment !== null && formik.errors.attachment ? (
            <div className={classes.error + " col-12"}>
              {formik.errors.attachment}
            </div>
          ) : null}

          <textarea
            id="message"
            name="message"
            type="text"
            placeholder="Something you want to write about"
            className={classes.message + " col-11"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />

          <br />

          <br />
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            className={classes.recaptcha}
            onChange={captchaValue}
          />

          <div className="col-12 text-center">
            <Button
              className={classes.btn + " col-6"}
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
    </React.Fragment>
  );
};

export default HomePageForm;
