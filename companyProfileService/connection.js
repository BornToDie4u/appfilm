const mongoose = require('mongoose');

function connectdb() {
    mongoose.connect("mongodb://127.0.0.1:27017/filmyfi-companyProfile-service").then(()=>{
        console.log('monog connected');
    })     
}

module.exports = connectdb ;