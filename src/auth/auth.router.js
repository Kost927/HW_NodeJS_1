const { Router } = require("express");
const authRouter = Router();

const {
    registerController,
    logInController,
    logOutController,
    verifyUser,
} = require("./auth.controllers");

const { validationMiddleware } = require("./auth.validator");


const {
    checkAuthTokenMiddleWare,
} = require("../middlewares/auth.middleware");

authRouter.post('/register', validationMiddleware, registerController)
authRouter.post('/login', validationMiddleware, logInController)
authRouter.post('/logout', checkAuthTokenMiddleWare, logOutController);
authRouter.get('/verify/:verificationToken', verifyUser);

module.exports = authRouter

