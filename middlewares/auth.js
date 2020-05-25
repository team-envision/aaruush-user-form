const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

exports.verifyUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Login Credentials Invalid.");
    }
    const authToken = req.headers.authorization.split(" ")[1];
    const authDetails = await new Promise((data) =>
      jwt.verify(
        authToken,
        process.env.JWT_SECRET_KEY,
        {
          issuer: "team-envision",
        },
        (err, decoded) => {
          if (err) {
            throw err;
          }
          return data(decoded);
        }
      )
    );
    const admin = await Admin.findOne({ username: authDetails.username });
    res.locals.admin = admin;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      res.status(401).json({
        status: "ERROR",
        error: `${err.name}`,
      });
    } else if (err.name === "SyntaxError") {
      res.status(401).json({
        status: "ERROR",
        error: `${err.name}`,
      });
    } else if (err.message === "Login Credentials Invalid.") {
      console.log(err);
      res.status(500).json({
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
