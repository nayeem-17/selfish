const express = require('express');
const { isValidJWTToken } = require('../controllers/authentication/authMiddlewares');
const { getTuiTionInfo, createTuiTionInfo, updateTuiTionInfo, deleteTuiTionInfo } = require('../controllers/TuitionInfoControllers');
const router = express.Router()

router.use(isValidJWTToken)

/**   
* @swagger   
*  /:
*      get:
*        responses:
*          "200":
*            description: OK
*/
router.get('/', (req, res) => res.json({ data: "Hello world" }))

/**
 * @swagger
 *  /tuition/getfulldata:   
 *    get:
 *      tags:
 *         - "Tuition"
 *      security:
 *         - bearerAuth: []
 *      description: To access all data from servers
 *      responses:
 *          '200':
 *              description: A successfull response.
 */

router.get('/getfulldata', getTuiTionInfo)
/**
 * @swagger
 *  /tuition/createtuition:
 *    post:
 *     tags:
 *      - "Tuition"
 *     security:
 *       - bearerAuth: []
 *     description: Update the data of a particuler id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/tuitionSchema"
 *     responses:
 *       "200":
 *         description: A successfull response. 
 * */
router.post('/createtuition', createTuiTionInfo)
/**
 * @swagger
 *  /tuition/updatetuitioninfo/{id}:   
 *    patch:
 *      tags:
 *        - "Tuition"
 *      security:
 *        - bearerAuth: []
 *      description: Update the data of a particuler id
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: yes
 *         example: "600aafc8c52663128624ebc6"
 *         description: id of the tuition object
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:  
 *              schema:
 *                 $ref: '#/components/schemas/tuitionSchema'
 *      responses:
 *          '200':
 *              description: A successfull response.
 */
router.patch('/updatetuitioninfo/:id', updateTuiTionInfo)
/**
 * @swagger
 *  /tuition/deletetuitioninfo/{id}:   
 *    delete:
 *      tags:
 *        - "Tuition"
 *      security:
 *        - bearerAuth: []
 *      description: Delete the data of a particuler id
 *      parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: yes
 *         example: "600aafc8c52663128624ebc6"
 *         description: id of the tuition object
 *      responses:
 *          '200':
 *              description: A successfull response.
 */
router.delete('/deletetuitioninfo/:id', deleteTuiTionInfo)

module.exports = router