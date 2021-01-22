const mongoose = require("mongoose");
const { contactSchema } = require("./ContactSchema");
const { monthSchema } = require("./MonthSchema");
const { paymentSchema } = require("./PaymentSchema");

const mainSchema = new mongoose.Schema({
    studentName: String,
    salaryPerMonth: Number,
    address: String,
    weekDay: [String],
    contacts: [contactSchema],
    isRunning: Boolean,
    months: [monthSchema],
    totalEarned: Number,
    payments: [paymentSchema],
    dueAmount: {
        type: Number,
        default: 0
    }
})
exports.TuitionInfo = mongoose.model("TuitionInfo", mainSchema)