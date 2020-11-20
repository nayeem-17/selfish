const mongoose = require("mongoose");
const { contactSchema } = require("./ContactSchema");
const { monthSchema } = require("./MonthSchema");
const { paymentSchema } = require("./PaymentSchema");

const mainSchema = new mongoose.Schema({
    studentName: String,
    salaryPerMonth: Number,
    months: [monthSchema],
    contacts: [contactSchema],
    totalEarned: Number,
    payments: [paymentSchema]
})
exports.TuitionInfo = mongoose.model("TuitionInfo", mainSchema)