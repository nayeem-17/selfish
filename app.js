const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const table = require('./models/newdata')
const morgan = require('morgan')
require('dotenv').config()

const port = process.env.PORT || 3000

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(e => {
    console.log("otally Fucked Up , Man!")
    console.log(e)
}).then(con => {
    console.log("Connection Established")
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', async (req, res) => {
    await table.create({})
    res.send('ok')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))