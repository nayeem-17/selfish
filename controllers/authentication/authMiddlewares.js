const jwt = require('jsonwebtoken');
const { userModel } = require('../../models/userSchema');
const { isPasswordValid, makeHash } = require('./authServices');

module.exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    const data = await userModel.find({ email: email });
    console.log(data);
    console.log(password + " " + email);
    console.log(makeHash(password))
        // if (!data) {
        //     return res.status(500).json({
        //         error: data.error
        //     });
        // }

    if (data.length == 0) {
        return res.status(404).json({
            error: "No account found"
        });
    }
    const hashPass = data[0].password;
    const { userId } = data[0];
    if (hashPass && isPasswordValid(hashPass, password)) {
        req.body = {
            userId: userId,
            username: data[0].username,
            email: email
        }
        console.log(req.body);
        next();
    } else {
        res.status(400).send({ errors: ['Invalid email or password'] });
    }
}
module.exports.isValidJWTToken = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            console.log(req.headers);
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                const userData = jwt.decode(authorization[1], process.env.JWT_SECRET);
                req.body.userId = userData.userId;
                next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
}