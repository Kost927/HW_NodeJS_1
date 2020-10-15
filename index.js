const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const contactsRouter = require("./api/contacts/router.js");


const app = express();
const PORT = 3000;

dotenv.config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "*");
  res.setHeader("Access-Control-Allow-Method", "*");
  next();
});

app.use(express.json());
app.use("/contacts", contactsRouter);



app.listen(PORT, () => console.log(`server started on port ${PORT}`));
