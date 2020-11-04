const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
    token: String
}, { versionKey: false });
class UserModel {
    constructor() {
        this.db = mongoose.model("Users", usersSchema);
    }

    getUsers = async (query) => {
        return await this.db.find(query);
    };

    findUser = async (query) => {
        return await this.db.findOne(query);
    };
    findEmailOfUsers = async (email) => {
        return await this.db.findOne({ email });
    };

    findUserById = async (userId) => {
        return await this.db.findById(userId);
    };

    isExistUser = async (email) => {
        return await this.findEmailOfUsers(email);
    };

    createUser = async (userData) => {
        return await this.db.create(userData);
    };

    updateUser = async (userId, userData) => {
        return await this.db.findByIdAndUpdate(userId, userData, {
            new: true,
        });
    };

    deleteUser = async (userId) => {
        return await this.db.findByIdAndRemove(userId);
    };
}
module.exports = new UserModel();


