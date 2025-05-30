const userrouter = require('./routes/userrouter')
const connectdb = require('./connection')
const cookieparser = require('cookie-parser')
const express = require('express');
const path = require("path");

connectdb();

const app = express();
const cors = require('cors');



app.use(express.static(path.join(__dirname, "public")));


app.use(cors());    
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/',userrouter)


module.exports = app;