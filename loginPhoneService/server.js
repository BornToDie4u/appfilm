const http = require('http');
const app = require('./app')


const port = 4008 ;
console.log(port);
const server = http.createServer(app);
 

server.listen(port ,'0.0.0.0', ()=>{
    console.log('server listning on port 4008');
})