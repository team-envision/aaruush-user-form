const Admin = require("../models/admin");
const Message = require("../models/message");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const json2csv = require("json2csv");

exports.postSignup = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({
      username: username,
      password: hashedPassword,
    });
    const result = await admin.save();
    if (result) {
      res.status(200).json({
        status: "OK",
      });
    }
  } catch (err) {
    if (
      err.name === "ValidationError" ||
      err.message === "Illegal arguments: undefined, number"
    ) {
      res.status(400).json({
        status: "ERROR",
        error: "Invalid Request. Missing Parameters.",
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

exports.postLogin = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (
      username === undefined ||
      username === null ||
      password === undefined ||
      password === null
    ) {
      throw new Error("Invalid Request. Missing Parameters.");
    }
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      throw new Error("Username or Password Wrong.");
    }
    const result = await bcrypt.compare(password, admin.password);
    if (!result) {
      throw new Error("Username or Password Wrong.");
    }
    const userJwt = jwt.sign(
      { username: username },
      process.env.JWT_SECRET_KEY,
      {
        issuer: "team-envision",
        expiresIn: "1h",
      }
    );
    res.locals.admin = admin;
    res.status(200).json({
      status: "OK",
      authToken: userJwt,
    });
  } catch (err) {
    if (err.message === "Invalid Request. Missing Parameters.") {
      res.status(400).json({
        status: "ERROR",
        error: err.message,
      });
    } else if (err.message === "Username or Password Wrong.") {
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

exports.getRecords = async (req, res, next) => {
  try {
    const data = await Message.find().select(
      "name city message attachment _id"
    );
    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const data = await Message.find().select(
      "name city message attachment -_id"
    );
    const fields = {
      fields: ["name", "city", "message", "attachment"],
    };
    const reportName =
      "report-" +
      new Date().toISOString() +
      "-" +
      res.locals.admin.username +
      ".csv";
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="' + reportName + '"'
    );
    const csv = await json2csv.parseAsync(data, fields);
    res.status(200).send(csv);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "ERROR",
      error: "Internal Server Error.",
    });
  }
};
