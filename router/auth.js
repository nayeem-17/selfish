const express = require('express');
const { getAccessToken } = require('../controllers/authentication/authControllers');
const { login, decodedData } = require('../controllers/authentication/authMiddlewares');
const { register } = require('../controllers/userController');
const router = express.Router()

router.post('/token', login, getAccessToken);
router.post('/registration', register)

module.exports = router;