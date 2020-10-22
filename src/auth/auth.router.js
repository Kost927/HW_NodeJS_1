const { Router } = require("express");
const authRouter = Router();

const {
    registerController,
} = require("./auth.controllers");

authRouter.post('/register', registerController)

module.exports = authRouter

