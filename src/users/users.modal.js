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

    createUser = async (userData) => {
        return await this.db.create(userData);
    };
    
    findUser = async (query) => {
        return await this.db.findOne(query);
    };
    // getUsers = async (query) => {
    //     return await this.db.find(query);
    // };

    // getUserById = async (userId) => {
    //     return await this.db.findById(userId);
    // };



    // updateUser = async (userId, userData) => {
    //     return await this.db.findByIdAndUpdate(userId, userData, {
    //         new: true,
    //     });
    // };

    // deleteUser = async (userId) => {
    //     return await this.db.findByIdAndRemove(userId);
    // };
}
module.exports = new UserModel();


