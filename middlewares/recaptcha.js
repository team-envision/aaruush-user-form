const axios = require("axios");

exports.captchaVerify = async (req, res, next) => {
  try {
    console.log(req.body);
    const responseToken = req.body["g-recaptcha-response"];
    if (!responseToken) {
      throw new Error("reCAPTCHA Missing.");
    }
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SERVER_SECRET_KEY,
          response: responseToken,
        },
      }
    );
    const auth = response.data;
    if (auth["error-codes"]) {
      throw new Error("reCAPTCHA Verification Failed.");
    }
    if (auth.success) {
      next();
    } else {
      throw new Error("Robots not allowed.");
    }
  } catch (err) {
    if (
      err.message === "reCAPTCHA Missing." ||
      err.message === "reCAPTCHA Verification Failed."
    ) {
      res.status(400).json({
        status: "ERROR",
        error: err.message,
      });
    } else if (err.message === "Robots not allowed.") {
      res.status(403).json({
        status: "ERROR",
        error: err.message,
      });
    } else {
      console.log(err);
      res.status(500).json({
        status: "ERROR",
        error: "Internal Server Error.",
      });
    }
  }
};
