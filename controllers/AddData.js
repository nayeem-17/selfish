const { TuitionInfo } = require("../models/MainModel")

exports.addData = async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        await TuitionInfo.create(data)
        res.send('ok')
    } catch (e) {
        res.status(404).json({
            error: e
        })
    }
}