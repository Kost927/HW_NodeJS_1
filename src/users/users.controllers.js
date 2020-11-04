const UserData = require("./users.modal");
const catchAsync = require("../utils/errCatcher");

const getUsersController = catchAsync(async (req, res, next) => {
    const { query } = req;
    const users = await UserData.getUsers(query);
    res.json(users);
});

const getCurrentUserController = catchAsync(async (req, res, next) => {
    const { id: userId } = req.user;
    const currentUser = await UserData.findUserById(userId);
    return res.json({
        email: currentUser.email,
        subscription: currentUser.subscription,
    });
});

const getUserByIdController = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await UserData.getUserById(userId);
    if (user) {
        return res.json(user);
    }
    res.status(404).json({ message: "Not found" });
});

const updateUsersController = catchAsync(async (req, res, next) => {
    const { id, ...data } = req.body;
    const user = await UserData.getUserById(id);
    if (user && req.body) {
        const updatedUser = await UserData.updateUser(id, data);
        return res.send(updatedUser);
    }
    res.status(404).json({ message: "Not found" });
});

const deleteUsersController = catchAsync(async (req, res, next) => {
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
};