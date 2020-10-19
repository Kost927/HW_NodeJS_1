const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const contactsRouter = require("./api/contacts/router.js");


const app = express();
const PORT = 3000;

dotenv.config();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use("/contacts", contactsRouter);

app.use((err, req, res, next) => {
  return res.status(err.status || 500).send(err.message);
  });



app.listen(PORT, () => console.log(`server started on port ${PORT}`));
