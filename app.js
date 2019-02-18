const http = require('http');
const run = require('./scripts/run');
const port = 3000;

const requestHandler = (req, res) => {
    console.log(req.url);
    res.end('Hello from AWS prolong session service!');
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
    run();
});
