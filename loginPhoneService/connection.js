const mongoose = require('mongoose');

function connectdb() {
    // mongoose.connect("mongodb://127.0.0.1:27017/filmyfi-userPhone-service").then(()=>{
    //     console.log('monog connected');
    // }) 
    mongoose.connect("mongodb+srv://lucifer25052005:6gIv65P66Dn6u0fK@cluster0.ajqwve3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
        console.log('monog connected');
    })     
}

module.exports = connectdb ;