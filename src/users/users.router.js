const { Router } = require("express");
const {
    getUsersController,
    getCurrentUserController,
    getUserByIdController,
    updateUsersController,
    deleteUsersController,
    updateUserAvatarController,
    uploadUserPhoto,
} = require("./users.controllers");
const usersRouter = Router();

const {
    checkAuthTokenMiddleWare,
} = require("../middlewares/auth.middleware");

usersRouter.get("/", checkAuthTokenMiddleWare, getUsersController);

usersRouter.get("/current", checkAuthTokenMiddleWare, getCurrentUserController);

usersRouter.get("/:userId", checkAuthTokenMiddleWare, getUserByIdController);
usersRouter.patch("/", checkAuthTokenMiddleWare, updateUsersController);
usersRouter.patch("/users/avatars", checkAuthTokenMiddleWare, updateUserAvatarController );
usersRouter.delete("/:userId", checkAuthTokenMiddleWare, deleteUsersController);
usersRouter.patch("/images", checkAuthTokenMiddleWare, uploadUserPhoto);

module.exports = usersRouter;
