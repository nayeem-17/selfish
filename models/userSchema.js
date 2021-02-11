const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userId: String
});
module.exports.userModel = mongoose.model('users', userSchema);