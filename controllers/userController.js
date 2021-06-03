const { userModel } = require("../models/userSchema");
const crypto = require('crypto');
const random = require('random')
const { makeHash } = require("./authentication/authServices");
const { sendVerificationMail } = require("../services/email/emailservices");
const { pendingUserModel } = require("../models/pendingUserSchema");

module.exports.register = async(req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!email) return res.status(401).json({ error: 'No email' });
        if (!username) return res.status(401).json({ error: 'No username' });
        const existingUsername = await userModel.find({ email: email });
        if (existingUsername[0]) return res.json({ error: ' Email exists!' });

        pendingUserModel.deleteOne({ email: email });


        const verification_code = random.int((min = 0), (max = 999999));
        await sendVerificationMail(verification_code, email);
        const userData = {
            username: username,
            email: email,
            password: makeHash(password),
            code: verification_code
        }
        const newUser = await userModel.create(userData);

        res.status(200).json({
            successful: true,
        })


    } catch (error) {
        res.status(404).json({
            message: "Error occured ! Read the documentation carefully",
        })
    }
}

module.exports.completeRegistration = async(req, res) => {

    try {

        const { email, code } = req.body;
        const pendingUser = await pendingUserModel.find({ email: email });
        console.log(pendingUser);

        if (pendingUserModel.length == 0) return res.status(401);
        if (pendingUser[0].code != code) return res.status(401);

        await pendingUserModel.deleteOne({ email: email });

        const userData = {
            username: pendingUser[0].username,
            email: email,
            password: pendingUser[0].password,
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
        })
    }
}