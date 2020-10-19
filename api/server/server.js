const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const contactsRouter = require("../contacts/router");
const morgan = require("morgan");
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use("/contacts", contactsRouter);
app.use((req, res) => res.status(404).json({ message: 'Not found, try to move on correct adress' }));
app.use(morgan("combined"));

app.use((err, req, res, next) => {
    return res.status(err.status || 500).send(err.message);
});


module.exports = app