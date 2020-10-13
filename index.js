const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const dotenv = require("dotenv");
const Users = require("./contacts");

const app = express();
const PORT = 3000;

dotenv.config()

app.use((req, res, next) => {
    console.log('first middleware')
    console.log(req.query)
    req.query.name = "Colin"
    next();
})

app.use((req, res, next) => {
    console.log('second middleware')
    console.log(req.query)
    req.query.surname = "Pupkin"
    next();
})

app.use((req, res, next) => {
    console.log('third middleware')
    console.log(req.query)
    next();
})

app.get('/users', async (req, res) => {
    const users = await Users.getUsers();
    res.json(users)

})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
