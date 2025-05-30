const express = require ('express');
const expressproxy = require ('express-http-proxy');

const app = express ();

app.use ('/user' , expressproxy('http://localhost:4001'));
app.use ('/profileuser' , expressproxy('http://localhost:4002'))


app.listen (4000 , ()=>{

    console.log("gateway listning on port 4000");
})