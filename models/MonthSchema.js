const mongoose = require("mongoose");
const { contactSchema } = require("./ContactSchema");
const { paymentSchema } = require("./PaymentSchema");

exports.monthSchema = new mongoose.Schema({
    monthNo: Number,
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date,
        default: Date.now()
    },
    activeDates: [Date],
    dayCount: Number,
    dueAmount: Number,
    address: String,
    weekDay: [String],
    contact: [contactSchema],
    isRunning: Boolean
})