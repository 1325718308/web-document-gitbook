const http = require('http');
const processRequest = require('./server');
const port = 8888;
const httpServer = http.createServer((request, response) => {
    processRequest(request, response);
})
httpServer.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});

