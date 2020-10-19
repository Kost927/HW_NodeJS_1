const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const contactsRouter = require("../contacts/router");
const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require("mongoose");

dotenv.config();
const DB_URI = `mongodb+srv://Kostya:D6UMCq2iZy7GrBAU@cluster0.mpf0h.mongodb.net/db-contacts?retryWrites=true&w=majority`
const PORT = 3000



class CrudServer {
    constructor() {
        this.app = null
    }
    async start() {
        this.initServer();
        this.initMiddlewares();
        this.initRouters();
        await this.initDataBase();
        this.initErrorHandling();
        this.startListening();
    }

    initServer() {
        this.app = express();
    }
    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({ origin: "http://localhost:3000" }));
        this.app.use(morgan("combined"));
    }

    initRouters() {
        this.app.use("/contacts", contactsRouter);
        this.app.use((req, res) => res.status(404).json({ message: 'Not found, try to move on correct adress' }));

    }

    async initDataBase() {
        try {
            await mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Database has been started");
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    initErrorHandling() {
        this.app.use((err, req, res, next) => {
            return res.status(err.status || 500).send(err.message);
        })
    }

    startListening() {
        this.app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    }
}

exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();