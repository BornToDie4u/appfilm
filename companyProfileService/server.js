const http = require('http');
const app = require('./app')


const port = 4003 ;
console.log(port);
const server = http.createServer(app);
 

server.listen(port , ()=>{
    console.log('server listning on port 4003');
})