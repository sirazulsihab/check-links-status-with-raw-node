const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');
const handler = require('./helpers/handleReqRes');

const app = {}
// configaration
app.config = {
    port:3000
}

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log('server runing with', app.config.port)
    })
}
// Handle Request and Response
app.handleReqRes = handler.handleReqRes;

// call server function
app.createServer();