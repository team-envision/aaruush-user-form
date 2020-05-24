const aws = require("aws-sdk");
const fs = require("fs");
const Message = require("../models/message");

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sslEnabled: true,
});

exports.postUpload = async (req, res, next) => {
  try {
    let imageUrl;
    if (req.file) {
      const objectParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: "data/" + req.file.filename,
        Body: fs.createReadStream(req.file.path),
        ACL: "public-read",
      };
      const uploadPromise = await s3.upload(objectParams).promise();
      imageUrl = uploadPromise.Location;
      fs.unlink(req.file.path, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    const message = new Message({
      name: req.body.name,
      city: req.body.city,
      message: req.body.message,
      attachment: imageUrl,
    });
    const result = await message.save();
    if (result) {
      res.status(200).json({
        status: "OK",
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(406).json({
        status: "ERROR",
        error: "Invalid Request. Missing Parameters.",
      });
    } else {
      res.status(500).json({
        status: "ERROR",
        error: "Internal Server Error.",
      });
    }
  }
};
