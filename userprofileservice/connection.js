const mongoose = require('mongoose');

function connectdb() {
    // mongoose.connect("mongodb://127.0.0.1:27017/filmyfi-userProfile-service").then(()=>{
    //     console.log('monog connected');
    // })     

    mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
        console.log('monog connected');
    })     

}

module.exports = connectdb ;