const express = require('express');
const { getAccessToken } = require('../controllers/authentication/authControllers');
const { login } = require('../controllers/authentication/authMiddlewares');
const { register, completeRegistration } = require('../controllers/userController');
const router = express.Router()
    /**  
     * @swagger
     * /auth/token:
     *  post:
     *    responses:
     *      "200":
     *        description: ok
     *      "400":
     *        description: error
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *                example: abc@gmail.com
     *              password:
     *                type: string
     *                example: abc123
     *    tags:
     *      - "user"
     */
router.post('/token', login, getAccessToken);

/**
 * @swagger
 * /auth/registration:
 *  post:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: cooper
 *              email:
 *                type: string
 *                example: abc@gmail.com
 *              password:
 *                type: string
 *                example: abc123
 *    tags:
 *      - "user"
 *    responses:
 *      "200":
 *        description: ok
 *      "404":
 *        description: error
 */

router.post('/registration', register);

router.post('/verify', completeRegistration);

module.exports = router;