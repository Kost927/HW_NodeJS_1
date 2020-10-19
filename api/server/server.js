const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const contactsRouter = require("../contacts/router");
const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const DB_URI = `mongodb+srv://Kostya:D6UMCq2iZy7GrBAU@cluster0.mpf0h.mongodb.net/db-contacts?retryWrites=true&w=majority`

const runServer = async () => {
    await mongoose.connect(DB_URI, { useUnifiedTopology: true })
    console.log('Data base has been connected')
    dotenv.config();

    app.use(cors({ origin: "http://localhost:3000" }));

    app.use(express.json());
    app.use("/contacts", contactsRouter);
    app.use((req, res) => res.status(404).json({ message: 'Not found, try to move on correct adress' }));
    app.use(morgan("combined"));

    app.use((err, req, res, next) => {
        return res.status(err.status || 500).send(err.message);
    });
}
runServer()


module.exports = app