const { Router } = require("express");
const authRouter = Router();

const {
    registerController,
    logInController,
    logOutController,
} = require("./auth.controllers");

const { validationMiddleware } = require("./auth.validator");


const {
    checkAuthTokenMiddleWare,
} = require("../middlewares/auth.middleware");

authRouter.post('/register', validationMiddleware, registerController)
authRouter.post('/login', validationMiddleware, logInController)
authRouter.post("/logout", validationMiddleware, logOutController);

module.exports = authRouter
