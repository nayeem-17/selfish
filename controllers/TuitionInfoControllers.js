const { TuitionInfo } = require("../models/MainModel")

exports.getTuiTionInfo = async (req, res) => {
    try {
        const data = await TuitionInfo.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({
            message: "Error occured ! Read the documentation carefully",
            error: error
        })
    }
}
exports.createTuiTionInfo = async (req, res) => {
    try {
        console.log(req.headers)
        const data = req.body
        const newData = await TuitionInfo.create(data)
        res.status(201).json({
            message: "OK",
            data: data,
            id: newData["_id"]
        })
    } catch (error) {
        res.status(404).json({
            message: "Error occured ! Read the documentation carefully",
            error: error
        })
    }
}
exports.updateTuiTionInfo = async (req, res) => {
    try {
        const data = req.body
        const updated = await TuitionInfo.findByIdAndUpdate(req.params.id, data, {
            new: true
        })
        res.status(200).json({
            updated: updated,
            message: "OK"
        })
    } catch (error) {
        res.status(404).json({
            message: "Error occured ! Read the documentation carefully",
            error: error
        })
    }
}
exports.deleteTuiTionInfo = async (req, res) => {
    try {
        await TuitionInfo.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "OK"
        })
    } catch (error) {
        res.status(404).json({
            message: "Error occured ! Read the documentation carefully",
            error: error
        })
    }
}
