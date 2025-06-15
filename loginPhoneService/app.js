const userrouter = require('./routes/userrouter')
const connectdb = require('./connection')
const cookieparser = require('cookie-parser')
const express = require('express');


connectdb();

const app = express();
const cors = require('cors');



app.use(cors());    
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',userrouter)


module.exports = app;