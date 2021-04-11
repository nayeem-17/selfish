const mongoose = require("mongoose");
const { contactSchema } = require("./ContactSchema");
const { monthSchema } = require("./MonthSchema");
const { paymentSchema } = require("./PaymentSchema");

const mainSchema = new mongoose.Schema({
    userId: String,
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

/**
* @swagger
* components:
*   schemas:
*     monthSchema:
*       type: object
*       properties:
*         userId:
*           type: integer
*         monthNo:
*           type: integer
*           example: 09
*         startDate:
*           type: string
*           format: date
*           example: 2021-09-11
*         endDate:
*           type: string
*           format: date
*           example: 2021-09-11
*         dayCount:
*           type: integer
*           example: 09
*         activeDates:
*           type: array
*           items:
*             type: string
*             format: date
*           example: [2021-09-11, 2021-09-11, 2021-09-11]
*     contactSchema:
*       type: object
*       properties:
*         relation:
*           type: string
*           example: papa
*         phone:
*           type: integer
*           example: 8801764223436
*     paymentSchema:
*       type: object
*       properties:
*         date:
*           type: string
*           format: date
*           example: 2021-09-11
*         amount:
*           type: integer
*           example: 12000
*         note:
*           type: string
*           example: yo bruh
*     tuitionSchema:
*       type: object
*       properties:
*         studentName:
*           type: string
*           example: nayeem
*         salaryPerMonth:
*           type: integer
*           example: 10000
*         address:
*           type: string
*           example: polashi
*         isRunning:
*           type: boolean
*           example: true
*         totalEarned:
*           type: integer
*           example: 25000
*         dueAmount:
*           type: integer
*           example: 7500
*         contacts:
*           type: array
*           items:
*             $ref: "#/components/schemas/contactSchema"
*         payements:
*           type: array
*           items:
*             $ref: "#/components/schemas/paymentSchema"
*         weekDay:
*           type: array
*           items:
*             type: string
*             format: date
*         months:
*           type: array
*           items:
*             $ref: "#/components/schemas/monthSchema"
*/