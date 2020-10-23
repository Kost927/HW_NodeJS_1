const { Router } = require("express");
const authRouter = Router();

const {
    registerController,
    logInController,
} = require("./auth.controllers");

authRouter.post('/register', registerController)
authRouter.post('/login', logInController)

module.exports = authRouter

