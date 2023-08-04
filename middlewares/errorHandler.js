"use strict"
module.exports = (err, req, res, next) => {
    console.log(err.message);
    if (err.status && err.message) {
        res.status(err.status).json({
            success: false,
            status: err.status,
            data: err,
            message: err.message
        })
    } else if (err.statusMsg === 201) {
        res.status(err.status).json({
            success: false,
            status: err.statusMsg,
            data: err,
            message: err.message
        })
    } else if (err.name === "JsonWebTokenError") {
        res.status(404).json({ success:false, status: 404, message: err.message})
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ success:false, status: 400, message: err.errors[0].message })
    } else if (err.name === "ValidationError") {
        const arr = []
        err.errors.forEach(err => {
            arr.push({
                success: false,
                status: 400,
                message: err.message
            })
        });
        res.status(400).json(arr)
    }else if (err.message == "Cannot read properties of null (reading '0')") {
        res.status(404).json({ success:false, status: 404, message: "No Data Found"})
    } else if (err.message) {
        res.status(500).json({success:false, status: 500, message: err.message})
    } else {
        res.status(500).json({success:false, status: 500, message: "Internal Server Error"})
    }
}