const express = require("express");
const app = express();
const usersRouter = require("./users/users.router");
const contactsRouter = require("./contacts/contacts.router");
const authRouter = require("./auth/auth.router");

app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);
app.use("/auth", authRouter);

module.exports = app;