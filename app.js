const express = require("express");
const app = express();
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");

// bode-part config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cloudinary configuration
cloudinary.config({
  cloud_name: "xokemam",
  api_key: "842235839956891",
  api_secret: "1h7yKGkZfheGfQiV3ggvgDCX7uk",
});

app.get("/", (request, response) => {
  response.json({ message: "Hey! This is your server response!" });
});

// image upload API
app.post("/upload-image", (request, response) => {
  // collected image from a user
  const data = {
    image: request.body.image,
  };

  // upload image here
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
});

module.exports = app;
