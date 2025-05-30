const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    }

},{timestamps : true})

schema.methods.generateAuthtoken = function(){
    const salt = "adityapurohit2525"

    const token = jwt.sign({_id : this._id} ,salt);

    return token;
}

schema.methods.comparepasswords = async function(password){

    return await bcrypt.compare(password , this.password);
}

schema.statics.hashpassword = async function(password){
        return await bcrypt.hash(password , 10);
}

const usermodle = mongoose.model('usermodle',schema);


module.exports = {usermodle};