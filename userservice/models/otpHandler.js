const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email : {
        type : String
    },
    otp : {
        type : String
    }

},{timestamps: true})

const otpModle = mongoose.model("otpModle" , schema);   

module.exports = {otpModle}