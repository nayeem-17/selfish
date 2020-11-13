const mongoose = require("mongoose");
const { monthSchema } = require("./MonthSchema");

const mainSchema = new mongoose.Schema({
    studentName: String,
    salaryPerMonth: Number,
    months: [monthSchema],
    totalEarned: Number
})
exports.TuitionInfo = mongoose.model("TuitionInfo", mainSchema)