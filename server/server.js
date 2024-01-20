const HTTP = require('http');
const Express = require('./Express');

const PORT = process.env.PORT || 3001;

const server = HTTP.createServer(Express);

server.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});