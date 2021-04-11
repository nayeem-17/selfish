const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const authRouter = require('./router/auth');
const tuitionRouter = require('./router/tuitionRouter')
const port = process.env.PORT || 3000

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mongo_url = process.env.NODE_ENV !== 'PROD' ? process.env.MONGO_LOCAL : process.env.MONGO_CLOUD

mongoose
    .connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(con => {
        console.log("Database Connection Established")
        console.log("mongodb url is " + mongo_url)
    })
    .catch(e => {
        console.log("Totally Fucked Up With Connecting Database , Man!" + mongo_url)
        console.log(e)
    })

app.use('/auth', authRouter)
app.use('/tuition', tuitionRouter)

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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header",
                },
            },
        }
    },
    apis: [
        "*.js",
        "./models/*.js",
        "./router/*js"
    ]

};

const swaggerDocs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.listen(port, () => console.log(`Example app listening on port ${port} !`))