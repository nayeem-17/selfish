const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        default: "Nayeem"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const table = mongoose.model("Table", schema)
module.exports = table