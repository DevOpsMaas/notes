import http = require('http');
import app = require('./app');
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});