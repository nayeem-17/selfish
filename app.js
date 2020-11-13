const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { getTuiTionInfo, createTuiTionInfo, updateTuiTionInfo, deleteTuiTionInfo } = require('./controllers/TuitionInfoControllers')
require('dotenv').config()

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

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/getfulldata/:id', getTuiTionInfo)
app.get('/createtuition', createTuiTionInfo)
app.patch('/updatetuitionInfo/:id', updateTuiTionInfo)
app.delete('/deletetuitionInfo/:id', deleteTuiTionInfo)
app.listen(port, () => console.log(`Example app listening on port ${port} !`))