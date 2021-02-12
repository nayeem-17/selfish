const { TuitionInfo } = require("../models/MainModel")

exports.getTuiTionInfo = async (req, res) => {
    try {
        const data = await TuitionInfo.find({ userId: req.body.userId })
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
        // console.log(req.body)
        const data = req.body
        if (!req.body.userId) res.status(403).json({ error: "Use new access token" })
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
        console.log(req.body);
        const data = req.body;
        const userId = data.userId;
        delete data.userId;
        const updated = await TuitionInfo.findOneAndUpdate({ _id: req.params.id, userId: userId }, data, {
            new: true,
            useFindAndModify: true
        })
        // const updated = await TuitionInfo.findByIdAndUpdate(req.params.id, data, {
        //     new: true,
        //     useFindAndModify: true
        // })
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
        await TuitionInfo.findOneAndDelete({ _id: req.params.id, userId: req.body.userId })
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
