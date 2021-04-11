const mongoose = require("mongoose");

exports.contactSchema = new mongoose.Schema({
    relation: String,
    phone: Number
})