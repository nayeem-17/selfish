const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { getTuiTionInfo, createTuiTionInfo, updateTuiTionInfo, deleteTuiTionInfo } = require('./controllers/TuitionInfoControllers');

const port = process.env.PORT || 3000

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
    .connect(process.env.MONGO_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(con => {
        console.log("Database Connection Established")
    })
    .catch(e => {
        console.log("Totally Fucked Up With Connecting Database , Man!")
        console.log(e)
    })

/**   
* @swagger   
*  /:
*      get:
*        responses:
*          "200":
*            description: OK
*/
app.get('/', (req, res) => res.send('Hello World!'))

/**
 * @swagger
 * /getfulldata:   
 *  get:
 *   description: To access all data from servers
 *   responses:
 *       '200':
 *           description: A successfull response.
 */

app.get('/getfulldata', getTuiTionInfo)
/**
 *  @swagger
  * /createtuition:
  *   post:
  *    description: Update the data of a particuler id
  *    requestBody:
  *      required: true
  *      content:
  *        application/json:
  *          schema:
  *            $ref: "#/components/schemas/tuitionSchema"
  *    responses:
  *      "200":
  *        description: A successfull response. 
  * */
app.post('/createtuition', createTuiTionInfo)
/**
 * @swagger
 * /updatetuitioninfo/{id}:   
 *  patch:
 *   description: Update the data of a particuler id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *          type: string
 *      required: yes
 *      example: "600aafc8c52663128624ebc6"
 *      description: id of the tuition object
 *   requestBody:
 *      required: true
 *      content:
 *         application/json:  
 *           schema:
 *              $ref: '#/components/schemas/tuitionSchema'
 *   responses:
 *       '200':
 *           description: A successfull response.
 */
app.patch('/updatetuitioninfo/:id', updateTuiTionInfo)
/**
 * @swagger
 * /deletetuitioninfo/{id}:   
 *  delete:
 *   description: Delete the data of a particuler id
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *          type: string
 *      required: yes
 *      example: "600aafc8c52663128624ebc6"
 *      description: id of the tuition object
 *   responses:
 *       '200':
 *           description: A successfull response.
 */
app.delete('/deletetuitioninfo/:id', deleteTuiTionInfo)

const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Backend API",
            description: "THis is a simple api created by using Express framework .Swagger is used auto-documetation.",
            version: "1.0.0",
            servers: [`http://localhost:${process.env.PORT}`],
            contact: {
                name: "dude"
            }
        },
    },
    apis: [
        "*.js",
        "./models/*.js"
    ]

};
const swaggerDocs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => console.log(`Example app listening on port ${port} !`))