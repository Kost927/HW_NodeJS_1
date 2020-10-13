const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const dotenv = require("dotenv");

const app = express();
const PORT = 3000;

dotenv.config()

app.use(express.json());

app.get("/hello", (req, res, next) => {
  console.log("req.body", req.body);
  res.send("Hello NodeJS");
});

app.get(
  "/weather", 
  (req, res, next) => {
    const weatherRules = Joi.object({
      lat: Joi.string().required(),
      lon: Joi.string().required()
    });
      const validationResalt = Joi.valid(req.query, weatherRules);

    if (validationResalt.error) {
        return res.status(400).send(validationResalt.error);
    }
    next();
  },
  (req, res, next) => {
    console.log("req.query", req.query);
    res.json({ weather: "test" });
  }
);

app.listen(PORT, () => console.log("starting port", PORT));
