const { userModel } = require("../models/userSchema");
const crypto = require('crypto');
const { makeHash } = require("./authentication/authServices");

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userData = {
            username: username,
            email: email,
            password: makeHash(password),
            userId: crypto.randomBytes(32).toString('base64')
        }
        const newUser = await userModel.create(userData);
        delete newUser.password;
        res.status(200).json({
            successful: true,
            userId: newUser.userId
        })
    } catch (error) {
        res.status(404).json({
            message: "Error occured ! Read the documentation carefully",
            error: error
        })
    }
}

