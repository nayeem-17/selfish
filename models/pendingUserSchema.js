const mongoose = require("mongoose");

const pendingUserschema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    code: Number
});
module.exports.pendingUserModel = mongoose.model('pendingUsers', pendingUserschema);