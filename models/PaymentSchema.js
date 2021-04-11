const mongoose = require("mongoose");

exports.paymentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    amount: Number,
    note: String
})