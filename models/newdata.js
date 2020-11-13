const mongoose = require("mongoose");
const { contactSchema } = require("./ContactSchema");
const { paymentSchema } = require("./PaymentSchema");


const schema = new mongoose.Schema({
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
    isRunning: Boolean,
    payments: [paymentSchema]
})

const mainSchema = new mongoose.Schema({
    studentName: String,
    salaryPerMonth: Number,
    months: [schema],
    totalEarned: Number
})

const table = mongoose.model("Table", mainSchema)
module.exports = table

const js = {
    "studentName": "Tanvir Hossain Taaha",
    "salaryPerMonth": 10000,
    "months": [{
        "monthNo": 1,
        "dayCount": 4,
        "dueAmmount": 10000,
        "address": "address string also co-ordinates can be added for google maps intgration(in my dreams) xDD",
        "weekDay": ["sat", "mon", "wed"],
        "contact": [
            {
                "relation": "student",
                "phone": "+8801764000000"
            },
            {
                "relation": "mother",
                "phone": "+8801764000000"
            },
            {
                "relation": "father",
                "phone": "+8801764000000"
            }
        ],
        "isRunning": true
    }],
    "totalEarned": 1000000
}
