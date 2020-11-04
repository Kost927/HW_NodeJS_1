const { verifyToken } = require("../services/token.service");
const UserModel = require("../users/users.modal");

const checkAuthTokenMiddleWare = async (req, res, next) => {
    try {
        const token = req.get("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const data = await verifyToken(token);
        const user = await User.findUserById(data.id);
        req.user = {
            email: user.email,
            id: user._id,
        };
        next();
    } catch (error) {
        res.status(401).send({ message: "Not authorized" });
    }
};

module.exports = {
    checkAuthTokenMiddleWare,
};