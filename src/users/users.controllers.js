const UserData = require("./users.modal");
const errCatcher = require("../utils/errCatcher");
const upload = require('../utils/imagesUploader');

const uploadUserPhoto = upload.single('avatarURL');

const getUsersController = errCatcher(async (req, res, next) => {
    const { query } = req;
    const users = await UserData.getUsers(query);
    res.json(users);
});

const getCurrentUserController = errCatcher(async (req, res, next) => {
    const { id: userId } = req.user;
    const currentUser = await UserData.findUserById(userId);
    return res.json({
        email: currentUser.email,
        subscription: currentUser.subscription,
    });
});

const getUserByIdController = errCatcher(async (req, res, next) => {
    const { userId } = req.params;
    const user = await UserData.getUserById(userId);
    if (user) {
        return res.json(user);
    }
    res.status(404).json({ message: "Not found" });
});

const updateUsersController = errCatcher(async (req, res, next) => {
    const { id, ...data } = req.body;
    const user = await UserData.getUserById(id);
    if (user && req.body) {
        const updatedUser = await UserData.updateUser(id, data);
        return res.send(updatedUser);
    }
    res.status(404).json({ message: "Not found" });
});

const updateUserAvatarController = errCatcher(async (req, res, next) => {
    console.log('req.user', req.user);
    const id = req.user.id;
    const user = await UserData.updateUser(id);

    if (!user) {
        return next(res.status(401).json({ message: "Not authorized" }));
    }
    const updatedUser = await UserData.updateUser(id, req.body);
    res.json({
        user: updatedUser,
    });
});



const deleteUsersController = errCatcher(async (req, res, next) => {
    const { userId } = req.params;
    const user = await UserData.getUserById(userId);
    if (user) {
        await UserData.deleteUser(userId);
        return res.json({ message: "user deleted" });
    }
    res.status(404).json({ message: "Not found" });
});

module.exports = {
    getUsersController,
    getUserByIdController,
    getCurrentUserController,
    updateUsersController,
    deleteUsersController,
    uploadUserPhoto,
    updateUserAvatarController,
};