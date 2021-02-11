const jwt = require('jsonwebtoken');
const { isPasswordValid } = require('./authServices');

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    //check if username exist or not,if yes then get its hashPass
    const hashPass = username;
    if (isPasswordValid(hashPass, password)) {
        req.body = {
            userId: 12,
            username: username,
            email: 'email'
        }
        next();
    } else {
        res.status(400).send({ errors: ['Invalid email or password'] });
    }
}
module.exports.isValidJWTToken = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] != 'Bearer') {
                return res.status(401).json({});
            } else {
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
                next();
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
}