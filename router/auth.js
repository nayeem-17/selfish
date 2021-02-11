const express = require('express');
const { getAccessToken } = require('../controllers/authentication/authControllers');
const { login } = require('../controllers/authentication/authMiddlewares');
const router = express.Router()

router.post('/token', login, getAccessToken);

module.exports = router;