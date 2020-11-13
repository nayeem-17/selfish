const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { addData } = require('./controllers/AddData')
require('dotenv').config()

const port = process.env.PORT || 3000
console.log(process.env.MONGO_CLOUD)

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(e => {
    console.log("Totally Fucked Up With Connecting Database , Man!")
    console.log(e)
}).then(con => {
    console.log("Connection Established")
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', addData)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))