const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const contactsRouter = require("./api/contacts/router.js");
const mongoose = require('mongoose');
const PORT = 3000;
dotenv.config();
const DB_URI = `mongodb+srv://Kostya:D6UMCq2iZy7GrBAU@cluster0.mpf0h.mongodb.net/db-contacts?retryWrites=true&w=majority`

const runServer = async () => {
  await mongoose.connect(DB_URI, { useUnifiedTopology: true })
  console.log('Data base has been connected')
const app = express();


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "*");
  res.setHeader("Access-Control-Allow-Method", "*");
  next();
});

app.use(express.json());
app.use("/contacts", contactsRouter);



app.listen(PORT, () => console.log(`server started on port ${PORT}`));

}

runServer()


